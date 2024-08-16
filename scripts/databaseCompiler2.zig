//!==================================================================
//!     		         Main.json creator
//!==================================================================
//!	Author  : Rohan Vashisht
//! License : Please check license file
//! Details : This file downloads and *compresses json from gh api
//! and stores it inside main.json.
//!
//! * : By compressed I mean removing uneeded feilds from the json
//!     and storing it inside ./database/main.json by doing:
//!
//! $ zig build run_databaseCompiler > ./database/main.json
//!==================================================================

// ---------- Imports ------------
const std = @import("std");
const helperFunctions = @import("helperFunctions");

// --------- Constants -----------
const urls = [_][]const u8{
    // Increment these whenever repositories having zig-package reach the next 100.
    "https://api.github.com/search/repositories?q=topic:zig+fork:true&page=1&per_page=100",
    "https://api.github.com/search/repositories?q=topic:zig+fork:true&page=2&per_page=100",
    "https://api.github.com/search/repositories?q=topic:zig+fork:true&page=3&per_page=100",
    "https://api.github.com/search/repositories?q=topic:zig+fork:true&page=4&per_page=100",
    "https://api.github.com/search/repositories?q=topic:zig+fork:true&page=5&per_page=100",
    "https://api.github.com/search/repositories?q=topic:zig+fork:true&page=6&per_page=100",
    "https://api.github.com/search/repositories?q=topic:zig+fork:true&page=7&per_page=100",
    "https://api.github.com/search/repositories?q=topic:zig+fork:true&page=8&per_page=100",
    "https://api.github.com/search/repositories?q=topic:zig+fork:true&page=9&per_page=100",
    "https://api.github.com/search/repositories?q=topic:zig+fork:true&page=10&per_page=100",
    "https://api.github.com/search/repositories?q=topic:zig+fork:true&page=11&per_page=100",
    "https://api.github.com/search/repositories?q=topic:zig+fork:true&page=12&per_page=100",
    "https://api.github.com/search/repositories?q=topic:zig+fork:true&page=13&per_page=100",
    "https://api.github.com/search/repositories?q=topic:zig+fork:true&page=14&per_page=100",
    "https://api.github.com/search/repositories?q=topic:zig+fork:true&page=15&per_page=100",
    "https://api.github.com/search/repositories?q=topic:zig+fork:true&page=16&per_page=100",
    "https://api.github.com/search/repositories?q=topic:zig+fork:true&page=17&per_page=100",
    "https://api.github.com/search/repositories?q=topic:zig+fork:true&page=18&per_page=100",
    "https://api.github.com/search/repositories?q=topic:zig+fork:true&page=19&per_page=100",
    "https://api.github.com/search/repositories?q=topic:zig+fork:true&page=20&per_page=100",
    "https://api.github.com/search/repositories?q=topic:zig+fork:true&page=21&per_page=100",
    "https://api.github.com/search/repositories?q=topic:zig+fork:true&page=22&per_page=100",
    "https://api.github.com/search/repositories?q=topic:zig+fork:true&page=23&per_page=100",
};

pub fn main() !void {
    // -------- Start the json file -------------
    helperFunctions.print("[", .{});

    var buffers_collection = std.ArrayList([]const u8).init(helperFunctions.globalAllocator);
    defer {
        for (buffers_collection.items) |item| {
            helperFunctions.globalAllocator.free(item);
        }
        buffers_collection.deinit();
    }
    for (urls) |url| {
        const res = try helperFunctions.fetch(helperFunctions.globalAllocator, url);
        if (!std.mem.eql(u8, res, "")) {
            try buffers_collection.append(res);
        } else {
            @panic("unable to reach url");
        }
    }
    const buffers = try buffers_collection.toOwnedSlice();
    defer helperFunctions.globalAllocator.free(buffers);
    for (buffers, 0..) |buffer, i| {
        // -------- Parse the json file --------
        const parsed = try std.json.parseFromSlice(std.json.Value, helperFunctions.globalAllocator, buffer, .{});
        defer parsed.deinit();

        // ----- Get all the items (Repos) as array -----
        const repoListUncompressed = parsed.value.object.get("items").?.array.items;

        // ----- If last result -----
        if (i == buffers.len - 1) {
            try helperFunctions.compressAndPrintRepos(repoListUncompressed, true);
        } else {
            try helperFunctions.compressAndPrintRepos(repoListUncompressed, false);
        }
    }

    // -------- End the json file ---------
    helperFunctions.print("]", .{});
}
