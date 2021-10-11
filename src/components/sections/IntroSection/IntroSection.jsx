import './IntroSection.css'

function IntroSection() {
    return (
        <div id="intro" className="basic-1">
            <div className="container">
                <div className="row">
                    <div className="col-lg-5">
                        <div className="text-container">
                            <div className="section-title">INTRO</div>
                            <h2>We Offer Some Of The Best Business Growth Services In Town</h2>
                            <p>Launching a new company or developing the market position of an existing one can be quite an overwhelming
                                processs at times.</p>
                            <p className="testimonial-text">"Our mission here at Aira is to get you through those tough moments relying on
                                our team's expertise in starting and growing companies."</p>
                            <div className="testimonial-author">Louise Donovan - CEO</div>
                        </div>
                    </div>
                    <div className="col-lg-7">
                        <div className="image-container">
                            <img className="img-fluid" src="images/intro-office.jpg" alt="alternative" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default IntroSection;