import { browser } from '@wdio/globals'

/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
export default class Page {

    get acceptCookiesButton(){
        return $("//button[@class='fc-button fc-cta-consent fc-primary-button']");
    }

    get pageTitle(){
        return $("//h1[@id='page_charts_section_charts_header_chart_name']");
    }

    async pageLoadingController(titleExpected, maxTimeout=15000){
        let title;
        await browser.waitUntil(async () => {
            title = await this.pageTitle.getText();
            return title === titleExpected;
        }, {timeout: maxTimeout, timeoutMsg: 'Title text did not match expected value. Expected [' + titleExpected + '] vs. [' + title + ']'});
    } 
    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    open (path) {
        return browser.url(`https://rateyourmusic.com/${path}`)
    }
}
