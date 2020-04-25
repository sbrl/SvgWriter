"use strict";

import test from 'ava';

import Vector2 from '../src/primitives/Vector2.mjs';

test("Creation", t => {
	var v1 = new Vector2(10, 10);
	
	t.is(v1.x, 10);
	t.is(v1.y, 10);
	
	var v2 = new Vector2(572, 672651);
	
	t.is(v2.x, 572);
	t.is(v2.y, 672651);
	
	var v3 = new Vector2(-4736, -48431);
	
	t.is(v3.x, -4736);
	t.is(v3.y, -48431);
});
test("Invalid Creation", (t) => {
	t.throws(() => {
		var v1 = new Vector2();
	});
	
	t.throws(() => {
		var v2 = new Vector2(34);
	});
	
	t.throws(() => {
		var v3 = new Vector2("cheese");
	});
	
	t.throws(() => {
		var v4 = new Vector2("cheese", "rocket");
	});
});
test("Addition", (t) => {
	var v1 = new Vector2(10, 10);
	v1.add(new Vector2(20, 20));
	
	t.is(v1.x, 30, "Simple adding - x");
	t.is(v1.y, 30, "Simple adding - y");
	
	var v = new Vector2(4, 6);
	v.add(new Vector2(5, 2));
	
	t.is(v.x, 9, "More simple adding - x");
	t.is(v.y, 8, "More simple adding - y");
});
test("Subtraction", (t) => {
	var v = new Vector2(10, 10);
	v.subtract(new Vector2(20, 20));
	
	t.is(v.x, -10, "Subtracting - x");
	t.is(v.y, -10, "Subtracting - y");
});
test("Division", (t) => {
	var v = new Vector2(10, 10);
	v.divide(20);
	
	t.is(v.x, 0.5, "Dividing - x");
	t.is(v.y, 0.5, "Dividing - y");
	
	t.throws(() => {
		v.divide("porcupine");
	});
});
test("Multiplication", (t) => {
	var v = new Vector2(3, 4);
	v.multiply(11);
	
	t.is(v.x, 33, "Multiplying number - x");
	t.is(v.y, 44, "Multiplying number - y");
	
	t.throws(() => {
		v.multiply("cake");
	});
	
	var v2 = new Vector2(4, 5),
		v3 = new Vector2(2, 3);
	v2.multiply(v3);
	
	t.is(v2.x, 8, "Multiplying Vector2 - x");
	t.is(v2.y, 15, "Multiplying Vector2 - y");
	t.is(v3.x, 2, "Multiplying Vector2 - 2nd instance x");
	t.is(v3.y, 3, "Multiplying Vector2 - 2nd instance y");
});
test("Dot Product", (t) => {
	var v1 = new Vector2(3, 4),
		v2 = new Vector2(4, 3),
		result = v1.dotProduct(v2);
	
	t.is(result, 24, "Dot product");
});
test("Clone Creation", (t) => {
	var v1 = new Vector2(3, 4),
		v2 = v1.clone();
	
	t.is(v1.x, v2.x, "Clone creation - x");
	t.is(v1.y, v2.y, "Clone creation - y");
});
test("Clone Alteration", (t) => {
	var v1 = new Vector2(3, 4),
		v2 = v1.clone();
	v2.x = 63;
	v2.y = 75;
	
	t.is(v1.x, 3, "Clone alteration - x1");
	t.is(v1.y, 4, "Clone alteration - y1");
	
	t.is(v2.x, 63, "Clone alteration - x2");
	t.is(v2.y, 75, "Clone alteration - y2");
});
test("Length", (t) => {
	var v = new Vector2(3, 4);
	
	t.is(v.length, 5, "Length");
});
test("Unit Vector2", (t) => {
	var v = new Vector2(3, 4),
		uv = v.unitVector2;
	
	t.is(uv.x, 0.6, "Unit Vector2 - x");
	t.is(uv.y, 0.8, "Unit Vector2 - y");
});
test("Limit To", (t) => {
	var v = new Vector2(3, 4),
		uv = v.limitTo(1);
	
	t.is(uv.x, 0.6, "Limit to - basic - x");
	t.is(uv.y, 0.8, "Limit to - basic - y");
	
	v = new Vector2(4, 5);
	uv = v.limitTo(10, 10);
	
	t.is(uv.x, 4, "Limit to - small - x");
	t.is(uv.y, 5, "Limit to - small - y");
	
	t.throws(() => {
		v.limitTo("cheese");
	});
});
test("Set To", (t) => {
	var v = new Vector2(3, 4),
		uv = v.setTo(1);
	
	t.is(uv.x, 0.6, "Set to - basic - x");
	t.is(uv.y, 0.8, "Set to - basic - y");
	
	v = new Vector2(3, 4);
	uv = v.setTo(13);
	
	t.assert(Math.abs(uv.x -  7.8) < 0.0001, "Set to - small - x");
	t.assert(Math.abs(uv.y - 10.4) < 0.0001, "Set to - small - y");
	
	t.throws(() => {
		v.limitTo("cheese");
	});
});
test("Angle From", (t) => {
	var v1 = new Vector2(3, 4),
		v2 = new Vector2(3, 8),
		angle = v2.angleFrom(v1),
		expected = 0;
	t.assert(Math.abs(angle - expected) < 0.0001, "Angle from - noon");
	
	v1 = new Vector2(3, 4),
	v2 = new Vector2(8, 4),
	angle = v1.angleFrom(v2),
	expected = Math.PI / 2;
	t.assert(Math.abs(angle - expected) < 0.0001, "Angle from - 3 o'clock");
	
	v1 = new Vector2(-4, 3),
	v2 = new Vector2(3, 3),
	angle = v1.angleFrom(v2),
	expected = Math.PI / 2;
	t.assert(Math.abs(angle - expected) < 0.0001, "Angle from - 3 o'clock - negative");
	
	v1 = new Vector2(3, 4),
	v2 = new Vector2(3, 8),
	angle = v1.angleFrom(v2),
	expected = Math.PI;
	t.assert(Math.abs(angle - expected) < 0.0001, "Angle from - 6 o'clock");
	
	v1 = new Vector2(-3, -4),
	v2 = new Vector2(-3, 8),
	angle = v1.angleFrom(v2),
	expected = Math.PI;
	t.assert(Math.abs(angle - expected) < 0.0001, "Angle from - 6 o'clock - negative");
});
test("minComponent", (t) => {
	var v = new Vector2(5, 8);
		
	t.is(v.minComponent, 5, "minComponent");
	
	v = new Vector2(5, -8);
	
	t.is(v.minComponent, 5, "minComponent - negative A");
	
	v = new Vector2(-5, 8);
	
	t.is(v.minComponent, -5, "minComponent - negative B");
	
	v = new Vector2(-5, -8);
	
	t.is(v.minComponent, -5, "minComponent - negative C");
});
test("maxComponent", (t) => {
	var v = new Vector2(5, 8);
	
	t.is(v.maxComponent, 8, "maxComponent");
	
	v = new Vector2(5, -8),
	
	t.is(v.maxComponent, -8, "maxComponent - negative A");
	
	v = new Vector2(-5, 8),
	
	t.is(v.maxComponent, 8, "maxComponent - negative B");
	
	v = new Vector2(-5, -8),
	
	t.is(v.maxComponent, -8, "maxComponent - negative C");
});
test("To String", (t) => {
	var v = new Vector2(5, 8);
	
	t.is(v.toString(), "(5, 8)", "To string");
});
