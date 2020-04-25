"use strict";

import Vector2 from './Vector2.mjs';
import Rectangle from './Rectangle.mjs';

/**
 * Represents an isosceles / equilateral Triangle in 2D space.
 * Features the ability to return its bounding box as a Rectangle - the struct
 * this struct was forked from.
 * Although the option UpsideDown property seems odd, there's a perfectly good reason
 * it's there, I just can't mention it here now because it's a part of a sekret
 * project :P
 * Ported from Triangle.cs, the C♯ version.
 * 
 ******************************************************
 * Changelog
 ******************************************************
 * v0.1 | 10th March 2018
	* Created this class by forking Rectangle
 */
class Triangle {
	constructor(in_position, in_base_width, in_height, in_upside_down = false) {
		/**
		 * The position of the Triangle.
		 * @type {Vector2}
		 */
		this.position = in_position;
		/**
		 * The width of this Triangle's base.
		 * @type {Number}
		 */
		this.base_width = in_base_width;
		/**
		 * The height of this Triangle.
		 * @type {Number}
		 */
		this.height = in_height;
		/**
		 * Whether this triangle is upside-down or not.
		 * @type {Boolean}
		 */
		this.upside_down = in_upside_down;
	}
	
	/**
	 * The bottom-left corner of the triangle
	 * @return {Vector2}
	 */
	get bottom_left() {
		return this.position.clone()
			.subtract(new Vector2(this.base_width / 2, 0));
	}
	
	/**
	 * The bottom-right corner or the triangle.
	 * @return {Vector2}
	 */
	get bottom_right() {
		return this.position.clone()
			.add(new Vector2(this.base_width / 2, 0));
	}
	
	/**
	 * The peak of the triangle.
	 * @return {Vector2}
	 */
	get peak() {
		return this.upside_down ? this.position.clone().add(new Vector2(0, this.height)) : this.position.subtract(new Vector2(0, this.height));
	}
	
	/**
	 * Get the rectangular bounding box of this triangle.
	 * @return {Rectangle}
	 */
	get bounds() {
		return new Rectangle(
			this.bottom_left.x,
			this.upside_down ? this.position.y : this.position.y - this.height,
			this.base_width,
			this.height
		);
	}
	
	toString() {
		return `[Triangle @ ${this.position} - ${this.base_width}x${this.height}, UpsideDown=${this.upside_down}]`;
	}
}

Triangle.Zero = new Triangle(
	Vector2.zero.clone(),
	0, 0,
	false
);

export default Triangle;
