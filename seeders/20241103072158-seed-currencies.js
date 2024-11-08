'use strict';
const { faker } = require('@faker-js/faker');
const moment = require('moment');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // const currencies = [];
    // const ticketsRequired = ['EUR', 'BYN', 'RUB', 'JPY', 'KZT', 'CNY', 'AUD', 'GBP'];
    //
    // for (let i = 0; i < 100; i++) {
    //   currencies.push({
    //     code: faker.finance.currencyCode(),     // Генерирует случайный код валюты
    //     value: parseFloat(faker.finance.amount()), // Генерирует случайное значение
    //     date: moment().format('YYYY-MM-DD'),
    //     createdAt: new Date(),
    //   });
    // }
    // await queryInterface.bulkInsert('currencies', currencies, {});

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
