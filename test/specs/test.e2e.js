import chai from 'chai';
const { expect } = chai;
import ChartsPage from '../pageobjects/charts.page.js'

describe('Rate Your Music E2E Tests', () => {
    it('Jazz Fusion results include Jazz Fusion Genre', async () => {
        await ChartsPage.open();
        await ChartsPage.acceptCookiesButton.click();
        await ChartsPage.jazzFusion();
        const primGen = await ChartsPage.primaryGenres
        
        for await(const element of primGen){
            let genres = await element.$$("a.genre.comma_separated");
            let isJazzFusion = false
            for (const genre of genres){
                let text = await genre.getText();
                if (text.includes('Jazz Fusion')) {
                    isJazzFusion = true
                    break;
                }
            }
            expect(isJazzFusion).to.be.true;            
        }
    })

    it("1970's Best Albums were released in the 70's", async () => {
        await ChartsPage.open();
        await ChartsPage.seventysBest();
        const relDates = await ChartsPage.releaseDates
        let in70s = true
        for await (const releaseDate of relDates){
            const date = await releaseDate.getText()
            const regex = /\d{4}/;
            const match = date.match(regex);
            const year = parseInt(match[0]);
            expect(year).to.be.greaterThan(1969);
            expect(year).to.be.lessThan(1980);
            }           
        }
    )
})

//TESTING JENKINS
