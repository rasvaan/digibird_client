import React, { Component } from 'react';
import { Banner, Footer } from 'components';
import Helmet from 'react-helmet';

export default class Home extends Component {
  render() {
    const styles = require('./Home.scss');

    return (
      <div>
        <Helmet title="Home"/>
        <Banner title="" image="home" />
        <div className={styles.taglineContainer + ' container'}>
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <h1 className={styles.text}>On the fly collection integration</h1>
            </div>
          </div>
        </div>

        <div className={styles.marketingContainer + ' container'}>
          <div className="row">
            <div className="col-sm-6 col-md-3">
              <i className={styles.jumboIcon + ' fa fa-university'}></i>
              <h2>Cultural Heritage</h2>
              <p>Providing access to cultural heritage data about birds, that is our goal. Preferably in an integrated view, combining videos, images, sounds and artworks. Birds are just the beginning, the methods we develop can be used for any topic.</p>
            </div>
            <div className="col-sm-6 col-md-3">
              <i className={styles.jumboIcon + ' fa fa-users'}></i>
              <h2>Crowdsourcing</h2>
              <p>Not all cultural heritage data is rich enough to be used from the start. In comes the crowd, helping us to better describe the collections. Do you know a lot about birds? Please help us identify them on arworks, in videos or provide sounds (as in recordings of bird sounds, not you mimicking them).</p>
            </div>
            <div className="col-sm-6 col-md-3">
              <i className={styles.jumboIcon + ' fa fa-align-center'}></i>
              <h2>Alignment</h2>
              <p>Cultural heritage data does not always work well together. One collection can be described in a completely different way as another. They might need some counseling, which we call alignment. We align it on the fly.</p>
            </div>
            <div className="col-sm-6 col-md-3">
              <i className={styles.jumboIcon + ' fa fa-rocket'}></i>
              <h2>API</h2>
              <p>And what can you do with this nicely enriched and aligned data? We will provide you with an API, allowing you to embed the data on your own site. Not that much of a code monkey? There will be a demonstrator showcasing the functions of this API.</p>
            </div>
          </div>
        </div>

        <div className={styles.partnerContainer + ' container'}>
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <h3>Partners</h3>
            </div>
          </div>

          <div className={styles.logoContainer + ' row'}>
            <div className={styles.logo + ' col-xs-6 col-sm-2'}>
              <a href="http://www.beeldengeluid.nl/en">
                <img src="img/logos/sound_and_vision.png" className="img-responsive">
                </img>
              </a>
            </div>
            <div className={styles.logo + ' col-xs-6 col-sm-2'}>
              <a href="https://www.rijksmuseum.nl/en">
                <img src="img/logos/rijksmuseum.png" className={styles.rijksmuseumLogo + ' img-responsive'}>
                </img>
              </a>
            </div>
            <div className={styles.logo + ' col-xs-6 col-sm-2'}>
              <a href="http://www.naturalis.nl/en/">
                <img src="img/logos/naturalis.png" className={styles.naturalisLogo + ' img-responsive'}>
                </img>
              </a>
            </div>
            <div className={styles.logo + ' col-xs-6 col-sm-2'}>
              <a href="http://vu.nl/en/">
                <img src="img/logos/vu.png" className={styles.vuLogo + ' img-responsive'}>
                </img>
              </a>
            </div>
            <div className={styles.logo + ' col-xs-6 col-sm-2'}>
              <a href="http://www.xeno-canto.org">
                <img src="img/logos/xeno-canto.png" className="img-responsive">
                </img>
              </a>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
