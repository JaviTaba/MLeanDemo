import { $ } from '@wdio/globals'
import Page from './base.page.js';

class ChartsPage extends Page {
    
    //Getters
    get searchbar () {
        return $("//input[@class='ui_browser_input']");
    }

    get includeBtn () {
        return $("//a[text()='Include']");
    }

    get genreBtn () {
        return $("//a[text()='Genre']");
    }

    get updateChartBtn () {
        return $("//a[text()='Update chart']");
    }

    get primaryGenres(){
        return $$("//div[@class='page_charts_section_charts_item_genres_primary']").slice(0,10);
    }

    get releaseDates(){
        return $$("//div[@class='page_charts_section_charts_item_date']").slice(0,10);
    }

    get dateSelectorBtn(){
        return $("//div[text()='2023']");
    }

    get seventysDecadeBtn(){
        return $("//div[@id='date_year_chooser_decade_1970']");
    }

    get dateCloseBtn(){
        return $("//div[@class='page_chart_query_date_close']/a");
    }

    get playerCloseBtn() {
        return $("//cnx[@class='cnx-ui-btn cnx-d-sm-none cnx-close-button']");
    }

    get adCloseBtn(){
        return $("//div[@class='ad-close-button']");
    }
    //Overwrite
    open () {
        return super.open('charts');
    }

    //E2E
    async jazzFusion () {
        (await this.searchbar).scrollIntoView();
        (await this.searchbar).setValue("Jazz Fusion");
        (await this.includeBtn).scrollIntoView();
        (await this.playerCloseBtn).click();
        (await this.adCloseBtn).click();
        (await this.includeBtn).click();
        (await this.genreBtn).click();
        (await this.updateChartBtn).click();
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

    async seventysBest(){
        (await this.dateSelectorBtn).click();
        (await this.playerCloseBtn).click();
        (await this.adCloseBtn).click();
        (await this.seventysDecadeBtn).click();
        (await this.dateCloseBtn).click();
        (await this.updateChartBtn).click();
        await this.pageLoadingController("Top albums of the 1970s");

        
    }
}

export default new ChartsPage();
