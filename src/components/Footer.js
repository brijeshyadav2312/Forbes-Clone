import React from "react";
import '../CSS/Footer.css'
const Footer = () => {
  return (
    <div>
      <div>
        <p className="footerHead">METHODOLOGY</p>
        <div className="aboutFooter">
          <span >
            Real-Time Billionaires rankings tracks the daily ups and downs
            of the world’s richest people. The wealth-tracking platform provides
            ongoing updates on the net worth and ranking of each individual
            confirmed by Forbes to be a billionaire. The value of individuals’
            public holdings are updated every 5 minutes when respective stock
            markets are open (there will be a 15-minute delay for stock prices).
            Individuals whose fortunes are significantly tied to private companies
            will have their net worths updated once a day. In cases where an
            individual owns a stake in a private company that accounts for 20% or
            more of his or her net worth, the value of the company will be
            adjusted according to an industry- or region-specific market index
            provided by our partners at FactSet Research Systems when available. A
            rotating cast of the five biggest winners and losers throughout the
            day is featured at the top of the page, followed by the complete list
            of billionaires ranked in order of net worth.
          </span>
        </div>
      </div>
      <div className="footerFooter">
          <p>BILLIONAIRES <p>© 2023. All Rights Reserved.</p><p>Devloped By Brijesh Yadav</p></p>
      </div>
    </div>
  );
};

export default Footer;
