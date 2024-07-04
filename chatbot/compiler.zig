//!===============================================================================//
//!                               Chat Bot compiler                               //
//!===============================================================================//
//! Author:
//! Rohan Vashisht
//!
//! Details:
//! This is a basic library convert corpus data into a typescript file!
//!
//! Please check license file for copyright details.

/// =============================
///            Imports
/// =============================
const std = @import("std");

/// =============================
///           Constants
/// =============================
pub const writer = std.io.getStdOut().writer();
pub const file_functions = std.fs.cwd();
pub const global_allocator = std.heap.page_allocator;

pub fn main() !void {
    const file = try file_functions.openFile("./chatbot/corpus/data.txt", .{});
    const text = try file.readToEndAlloc(global_allocator, try file.getEndPos());
    defer global_allocator.free(text);
    var lines = std.mem.split(u8, text, "\n");
    while (lines.next()) |line| {
        if (std.mem.eql(u8, line, "")) {
            continue;
        }
        var it = std.mem.split(u8, line, ":");
        const input = it.next().?;
        const response = it.next().?;
        // the input contains 3 words, response can contain any amount of chars
        var it2 = std.mem.split(u8, input, ",");
        try writer.print("if(user_input.includes('{s}') && user_input.includes('{s}') && user_input.includes('{s}')) {{\n", .{ it2.next().?, it2.next().?, it2.next().? });
        try writer.print("    return '{s}';\n", .{response});
        try writer.print("}}\n", .{});
    }
    return;
}
