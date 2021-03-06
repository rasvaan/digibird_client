import React, { Component } from 'react';
import { Banner, Footer } from 'components';
import Helmet from 'react-helmet';

export default class People extends Component {
  render() {
    const styles = require('./People.scss');

    return (
      <div>
        <Helmet title="People"/>
        <Banner title="People" image="people" />
        <div className={`${styles.persons} container`}>
          <div className="row">
            <div className="col-sm-6 col-md-4 person">
              <div className="well">
                <img src="img/pictures/chris.png" className={`${styles.picture} img-responsive`}></img>
                <h3>Chris Dijkshoorn</h3>
                <a href="http://chrisdijkshoorn.nl">Website</a>
                <p>c.r.dijkshoorn@vu.nl</p>
                <div className={styles.logoContainer}>
                  <a href="http://vu.nl/en/">
                    <img src="img/logos/vu.png" className={`${styles.logo} img-responsive`}>
                    </img>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-4 person">
              <div className="well">
                <img src="img/pictures/cristina.jpg" className={`${styles.picture} img-responsive`}></img>
                <h3>Cristina Bucur</h3>
                <a href="https://www.researchgate.net/profile/Cristina_Iulia_Bucur">Website</a>
                <p>cristina.bucur@student.vu.nl</p>
                <div className={styles.logoContainer}>
                  <a href="http://vu.nl/en/">
                    <img src="img/logos/vu.png" className={`${styles.logo} img-responsive`}>
                    </img>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-4 person">
              <div className="well">
                <img src="img/pictures/lora.jpg" className={`${styles.picture} img-responsive`}></img>
                <h3>Lora Aroyo</h3>
                <a href="http://www.cs.vu.nl/~laroyo/">Website</a>
                <p>lora.aroyo@vu.nl</p>
                <div className={styles.logoContainer}>
                  <a href="http://vu.nl/en/">
                    <img src="img/logos/vu.png" className={`${styles.logo} img-responsive`}>
                    </img>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-4 person">
              <div className="well">
                <img src="img/pictures/maarten.jpg" className={`${styles.picture} img-responsive`}></img>
                <h3>Maarten Brinkerink</h3>
                <a href="http://www.beeldengeluid.nl/kennis/experts/maarten-brinkerink">Website</a>
                <p>mbrinkerink@beeldengeluid.nl</p>
                <div className={styles.logoContainer}>
                  <a href="http://www.beeldengeluid.nl/en">
                    <img src="img/logos/sound_and_vision.png" className={`${styles.logo} img-responsive`}>
                    </img>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-4 person">
              <div className="well">
                <img src="img/pictures/sander.jpg" className={`${styles.picture} img-responsive`}></img>
                <h3>Sander Pieterse</h3>
                <a href="https://www.linkedin.com/in/smpieterse">Website</a>
                <p>sander@xeno-canto.org</p>
                <div className={styles.logoContainer}>
                  <a href="http://www.xeno-canto.org">
                    <img src="img/logos/xeno-canto.png" className={`${styles.logo} img-responsive`}>
                    </img>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-4 person">
              <div className="well">
                <img src="img/pictures/maartenh.jpg" className={`${styles.picture} img-responsive`}></img>
                <h3>Maarten Heerlien</h3>
                <a href="https://www.linkedin.com/in/maarten-heerlien-0b11b4a">Website</a>
                <p>maarten.heerlien@naturalis.nl</p>
                <div className={styles.logoContainer}>
                  <a href="http://www.naturalis.nl/en/">
                    <img src="img/logos/naturalis.png" className={`${styles.logo} img-responsive`}>
                    </img>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
