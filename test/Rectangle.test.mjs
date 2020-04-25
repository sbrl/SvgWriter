"use strict";

import test from 'ava';

import Rectangle from '../src/primitives/Rectangle.mjs';
import Vector2 from '../src/primitives/Vector2.mjs';

test("Creation", t => {
	let r1 = new Rectangle(-100, 60, 11, 22);
	t.is(r1.x, -100, "Creation - x");
	t.is(r1.y, 60, "Creation - y");
	t.is(r1.width, 11, "Creation - width");
	t.is(r1.height, 22, "Creation - height");
})

// TODO: Test setters too

test("Top left", t => {
	let r1 = new Rectangle(50, 100, 25, 25);
	t.is(r1.top_left.x, 50, "top_left - x");
	t.is(r1.top_left.y, 100, "top_left - y");
})
test("Top right", t => {
	let r1 = new Rectangle(50, 100, 25, 25);
	t.is(r1.top_right.x, 75, "top_right - x");
	t.is(r1.top_right.y, 100, "top_right - y");
});

test("Bottom left", t => {
	let r1 = new Rectangle(50, 100, 25, 25);
	t.is(r1.bottom_left.x, 50, "bottom_left - x");
	t.is(r1.bottom_left.y, 125, "bottom_left - y");
})

test("Bottom right", t => {
	let r1 = new Rectangle(50, 100, 25, 25);
	t.is(r1.bottom_right.x, 75, "bottom_right - x");
	t.is(r1.bottom_right.y, 125, "bottom_right - y");
})

test("Centre", t => {
	let r1 = new Rectangle(350, 250, 100, 100);
	t.is(r1.centre.x, 400, "centre - x");
	t.is(r1.centre.y, 300, "centre - y");
})

test("top", t => {
	let r1 = new Rectangle(-100, -100, 10, 10);
	t.is(r1.top, -100, "top");
});
test("bottom", t => {
	let r1 = new Rectangle(-100, -100, 10, 10);
	t.is(r1.bottom, -90, "bottom");
});
test("left", t => {
	let r1 = new Rectangle(-100, -100, 10, 10);
	t.is(r1.left, -100, "left");
});
test("right", t => {
	let r1 = new Rectangle(-100, -100, 10, 10);
	t.is(r1.right, -90, "right");
});

test("size", t => {
	let r1 = new Rectangle(425, 768, 23, 47);
	t.is(r1.size.x, 23, "size - x");
	t.is(r1.size.y, 47, "size - y");
})

test("move_by", t => {
	let r1 = new Rectangle(33, 33, 99, 2382);
	
	r1.move_by(new Vector2(7, 7));
	
	t.is(r1.x, 40, "move_by - x");
	t.is(r1.y, 40, "move_by - y");
	t.is(r1.width, 99, "move_by - width");
	t.is(r1.height, 2382, "move_by - height");
})

test("overlaps", t => {
	let r1 = new Rectangle(10, 10, 5, 5),
		r2 = new Rectangle(5, 5, 10, 10),
		r3 = new Rectangle(0, 0, 10, 10),
		r4 = new Rectangle(11, 11, 5, 5);
	
	t.true(r1.overlaps(r2), "overlaps - true");
	t.true(r1.overlaps(r3), "overlaps - true - touches");
	t.true(r2.overlaps(r3), "overlaps - true");
	t.false(r4.overlaps(r3), "overlaps - false - only just");
	
	t.is(r1.x, 10, "immutable check");
	t.is(r1.y, 10, "immutable check");
	t.is(r1.width, 5, "immutable check");
	t.is(r1.height, 5, "immutable check");
	t.is(r2.x, 5, "immutable check");
	t.is(r2.y, 5, "immutable check");
	t.is(r2.width, 10, "immutable check");
	t.is(r2.height, 10, "immutable check");
	t.is(r3.x, 0, "immutable check");
	t.is(r3.y, 0, "immutable check");
	t.is(r3.width, 10, "immutable check");
	t.is(r3.height, 10, "immutable check");
	t.is(r4.x, 11, "immutable check");
	t.is(r4.y, 11, "immutable check");
	t.is(r4.width, 5, "immutable check");
	t.is(r4.height, 5, "immutable check");
})

test("is_inside_vector", t => {
	let r1 = new Rectangle(10, 10, 5, 5);
	
	t.true(r1.is_inside_vector(new Vector2(11, 11)), "inside");
	t.false(r1.is_inside_vector(new Vector2(9, 9)), "outside - A");
	t.false(r1.is_inside_vector(new Vector2(99, 99)), "outside - B");
})

test("is_inside", t => {
	let r1 = new Rectangle(50, 50, 100, 100),
		r2 = new Rectangle(75, 75, 10, 10),
		r3 = new Rectangle(9999, 9999, 100, 100);
	
	t.true(r2.is_inside(r1), "inside");
	t.false(r3.is_inside(r1), "outside");
});

test("clone", t => {
	let r1 = new Rectangle(1, 2, 3, 4);
	
	t.is(r1.x, 1);
	t.is(r1.y, 2);
	t.is(r1.width, 3);
	t.is(r1.height, 4);
	
	let r2 = r1.clone();
	
	t.is(r2.x, 1);
	t.is(r2.y, 2);
	t.is(r2.width, 3);
	t.is(r2.height, 4);
	
	r2.x = 5;
	r2.y = 6;
	r2.width = 7;
	r2.height = 8;
	
	t.is(r2.x, 5);
	t.is(r2.y, 6);
	t.is(r2.width, 7);
	t.is(r2.height, 8);
	
	t.is(r1.x, 1);
	t.is(r1.y, 2);
	t.is(r1.width, 3);
	t.is(r1.height, 4);
})

test("toString", t => {
	let r1 = new Rectangle(1, 2, 3, 4);
	
	r1.toString()
	
	t.pass();
})

test("Rectangle.zero", t => {
	t.is(Rectangle.zero.x, 0);
	t.is(Rectangle.zero.y, 0);
	t.is(Rectangle.zero.width, 0);
	t.is(Rectangle.zero.height, 0);
})
