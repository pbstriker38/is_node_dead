'use strict';

const crypto = require('crypto');

const GiphyClient = require('./giphy_client');

module.exports = class AnswerRandomizer {
  constructor(message, color) {
    this._message = message;
    this._color = color;
  }

  get message() {
    return this._message;
  }

  set message(message) {
    this._message = message;
  }

  get color() {
    return this._color;
  }

  set color(color) {
    this._color = color;
  }

  get image() {
    return this._image;
  }

  set image(image) {
    this._image = image;
  }

  async randomize() {
    let answers = [
      { message: 'Yes 🥺', color: '#1bb535' },
      { message: 'Yes', color: '#1bb535', tag: 'sad' },
      { message: 'Yes 🤦🏾‍♀️', color: '#1bb535' },
      { message: 'No 🙅🏽‍♂️', color: '#cc4c42' },
      { message: 'No', color: '#cc4c42', tag: 'no' },
      { message: 'Maybe 🤷🏻‍♂️', color: '#d6d016' },
      { message: 'Unlikely 🦄', color: '#d68916' },
      { message: 'Preposterous 🤨', color: '#cc4c42' },
      { message: 'Are you dead? 🧟', color: '#359c2e' },
      { message: 'Never 🙉', color: '#cc4c42' },
      { message: 'Never', color: '#cc4c42', tag: 'never' },
      { message: 'LOL', color: '#cc4c42', tag: 'laughing' },
      { message: 'Deno?', color: '#9e1028', tag: 'dinosaur' },
      { message: 'Deno?', color: '#d6d016', image_url: '/images/deno_logo.png' },
      { message: 'Deno?', color: '#d68916', image_url: '/images/deno-rect-24fps.gif' }
    ]
    let a = answers[crypto.randomInt(answers.length)]

    this._message = a.message
    this._color = a.color

    if(a.tag) {
      await this.randomizeImage(a.tag)
    }

    if(a.image_url) {
      this._image = a.image_url
    }
  }

  async randomizeImage(tag=this._message) {
    let giphy_client = new GiphyClient;
    let url = await giphy_client.randomGif({ tag: tag });

    this._image = url;
  }
}
