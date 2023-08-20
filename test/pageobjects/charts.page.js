import { $ } from '@wdio/globals'
import Page from './base.page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class ChartsPage extends Page {
    /**
     * define selectors using getter methods
     */
    get searchbar () {
        return $("//input[@class='ui_browser_input']");
    }

    get includeButton () {
        return $("//a[text()='Include']");
    }

    get genreButton () {
        return $("//a[text()='Genre']");
    }

    get updateChartButton () {
        return $("//a[text()='Update chart']");
    }

    get primaryGenres(){
        return $$("//div[@class='page_charts_section_charts_item_genres_primary']").slice(0,10);
    }

    get dateSelector(){
        return $("//div[text()='2023']");
    }

    get seventysDecade(){
        return $("//div[@id='date_year_chooser_decade_1970']");
    }

    async jazzFusion () {
        (await this.searchbar).scrollIntoView();
        (await this.searchbar).setValue("Jazz Fusion");
        (await this.includeButton).click();
        (await this.genreButton).click();
        (await this.updateChartButton).click();
        await this.pageLoadingController("Top Jazz Fusion albums of 2023");
        const primGen = await this.primaryGenres
        let counter = 0;
        for await(const element of primGen){
            let genres = await element.$$("a.genre.comma_separated");
            for (const genre of genres){
                let text = await genre.getText();
                if (text.includes('Jazz Fusion')) {
                    counter = counter+1;
                    break;
                }
            }
            if (counter = 10){
                console.log("First 10 results include 'Jazz Fusion'");
                break;
            }
        }
    }



    open () {
        return super.open('charts');
    }
}

export default new ChartsPage();
