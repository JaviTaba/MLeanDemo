import { expect } from '@wdio/globals'
import ChartsPage from '../pageobjects/charts.page.js'

describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        await ChartsPage.open();
        await ChartsPage.acceptCookiesButton.click();
        await ChartsPage.jazzFusion();

    })
})

