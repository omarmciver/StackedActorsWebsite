import './PhotoSection.css'

function PhotoSection() {

    return (
        <div>
            <div id="images" className="filter">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title">IMAGES</div>
                            <h2>Images That We're Proud Of</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">

                            <div className="button-group filters-button-group">
                                <a className="button is-checked" data-filter="*"><span>SHOW ALL</span></a>
                                <a className="button" data-filter=".design"><span>Chapter 5</span></a>
                                <a className="button" data-filter=".design"><span>Chapter 4</span></a>
                                <a className="button" data-filter=".development"><span>Chapter 3</span></a>
                                <a className="button" data-filter=".marketing"><span>Chapter 2</span></a>
                                <a className="button" data-filter=".seo"><span>Chapter 1</span></a>
                            </div>
                            <div className="grid">
                                <div className="element-item development">
                                    <a className="popup-with-move-anim" href="#project-1">
                                        <div className="element-item-overlay"><span>Online Banking</span></div><img src="images/project-1.jpg"
                                            alt="alternative" />
                                    </a>
                                </div>
                                <div className="element-item development">
                                    <a className="popup-with-move-anim" href="#project-2">
                                        <div className="element-item-overlay"><span>Classic Industry</span></div><img src="images/project-2.jpg"
                                            alt="alternative" />
                                    </a>
                                </div>
                                <div className="element-item design development marketing">
                                    <a className="popup-with-move-anim" href="#project-3">
                                        <div className="element-item-overlay"><span>BoomBap Audio</span></div><img src="images/project-3.jpg"
                                            alt="alternative" />
                                    </a>
                                </div>
                                <div className="element-item design development marketing">
                                    <a className="popup-with-move-anim" href="#project-4">
                                        <div className="element-item-overlay"><span>Van Moose</span></div><img src="images/project-4.jpg"
                                            alt="alternative" />
                                    </a>
                                </div>
                                <div className="element-item design development marketing seo">
                                    <a className="popup-with-move-anim" href="#project-5">
                                        <div className="element-item-overlay"><span>Joy Moments</span></div><img src="images/project-5.jpg"
                                            alt="alternative" />
                                    </a>
                                </div>
                                <div className="element-item design marketing seo">
                                    <a className="popup-with-move-anim" href="#project-6">
                                        <div className="element-item-overlay"><span>Spark Events</span></div><img src="images/project-6.jpg"
                                            alt="alternative" />
                                    </a>
                                </div>
                                <div className="element-item design marketing">
                                    <a className="popup-with-move-anim" href="#project-7">
                                        <div className="element-item-overlay"><span>Casual Wear</span></div><img src="images/project-7.jpg"
                                            alt="alternative" />
                                    </a>
                                </div>
                                <div className="element-item design marketing">
                                    <a className="popup-with-move-anim" href="#project-8">
                                        <div className="element-item-overlay"><span>Zazoo Apps</span></div><img src="images/project-8.jpg"
                                            alt="alternative" />
                                    </a>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
            <div id="project-1" className="lightbox-basic zoom-anim-dialog mfp-hide">
                <div className="row">
                    <button title="Close (Esc)" type="button" className="mfp-close x-button">×</button>
                    <div className="col-lg-8">
                        <img className="img-fluid" src="images/project-1.jpg" alt="alternative" />
                    </div>
                    <div className="col-lg-4">
                        <h3>Online Banking</h3>
                        <hr className="line-heading" />
                        <h6>Strategy Development</h6>
                        <p>Need a solid foundation for your business growth plans?Aria will help you manage sales and meet your current
                            needs</p>
                        <p>By offering the best professional services and quality products in the market.Don't hesitate and get in
                            touch with us.</p>
                        <div className="testimonial-container">
                            <p className="testimonial-text">Need a solid foundation for your business growth plans?Aria will help you manage
                                sales and meet your current requirements.</p>
                            <p className="testimonial-author">General Manager</p>
                        </div>
                        <a className="btn-solid-reg" href="#your-link">DETAILS</a> <a className="btn-outline-reg mfp-close as-button"
                            href="#projects">BACK</a>
                    </div>
                </div>
            </div>



            <div id="project-2" className="lightbox-basic zoom-anim-dialog mfp-hide">
                <div className="row">
                    <button title="Close (Esc)" type="button" className="mfp-close x-button">×</button>
                    <div className="col-lg-8">
                        <img className="img-fluid" src="images/project-2.jpg" alt="alternative" />
                    </div>
                    <div className="col-lg-4">
                        <h3>Classic Industry</h3>
                        <hr className="line-heading" />
                        <h6>Strategy Development</h6>
                        <p>Need a solid foundation for your business growth plans?Aria will help you manage sales and meet your current
                            needs</p>
                        <p>By offering the best professional services and quality products in the market.Don't hesitate and get in
                            touch with us.</p>
                        <div className="testimonial-container">
                            <p className="testimonial-text">Need a solid foundation for your business growth plans?Aria will help you manage
                                sales and meet your current requirements.</p>
                            <p className="testimonial-author">General Manager</p>
                        </div>
                        <a className="btn-solid-reg" href="#your-link">DETAILS</a> <a className="btn-outline-reg mfp-close as-button"
                            href="#projects">BACK</a>
                    </div>
                </div>
            </div>



            <div id="project-3" className="lightbox-basic zoom-anim-dialog mfp-hide">
                <div className="row">
                    <button title="Close (Esc)" type="button" className="mfp-close x-button">×</button>
                    <div className="col-lg-8">
                        <img className="img-fluid" src="images/project-3.jpg" alt="alternative" />
                    </div>
                    <div className="col-lg-4">
                        <h3>BoomBap Audio</h3>
                        <hr className="line-heading" />
                        <h6>Strategy Development</h6>
                        <p>Need a solid foundation for your business growth plans?Aria will help you manage sales and meet your current
                            needs</p>
                        <p>By offering the best professional services and quality products in the market.Don't hesitate and get in
                            touch with us.</p>
                        <div className="testimonial-container">
                            <p className="testimonial-text">Need a solid foundation for your business growth plans?Aria will help you manage
                                sales and meet your current requirements.</p>
                            <p className="testimonial-author">General Manager</p>
                        </div>
                        <a className="btn-solid-reg" href="#your-link">DETAILS</a> <a className="btn-outline-reg mfp-close as-button"
                            href="#projects">BACK</a>
                    </div>
                </div>
            </div>



            <div id="project-4" className="lightbox-basic zoom-anim-dialog mfp-hide">
                <div className="row">
                    <button title="Close (Esc)" type="button" className="mfp-close x-button">×</button>
                    <div className="col-lg-8">
                        <img className="img-fluid" src="images/project-4.jpg" alt="alternative" />
                    </div>
                    <div className="col-lg-4">
                        <h3>Van Moose</h3>
                        <hr className="line-heading" />
                        <h6>Strategy Development</h6>
                        <p>Need a solid foundation for your business growth plans?Aria will help you manage sales and meet your current
                            needs</p>
                        <p>By offering the best professional services and quality products in the market.Don't hesitate and get in
                            touch with us.</p>
                        <div className="testimonial-container">
                            <p className="testimonial-text">Need a solid foundation for your business growth plans?Aria will help you manage
                                sales and meet your current requirements.</p>
                            <p className="testimonial-author">General Manager</p>
                        </div>
                        <a className="btn-solid-reg" href="#your-link">DETAILS</a> <a className="btn-outline-reg mfp-close as-button"
                            href="#projects">BACK</a>
                    </div>
                </div>
            </div>



            <div id="project-5" className="lightbox-basic zoom-anim-dialog mfp-hide">
                <div className="row">
                    <button title="Close (Esc)" type="button" className="mfp-close x-button">×</button>
                    <div className="col-lg-8">
                        <img className="img-fluid" src="images/project-5.jpg" alt="alternative" />
                    </div>
                    <div className="col-lg-4">
                        <h3>Joy Moments</h3>
                        <hr className="line-heading" />
                        <h6>Strategy Development</h6>
                        <p>Need a solid foundation for your business growth plans?Aria will help you manage sales and meet your current
                            needs</p>
                        <p>By offering the best professional services and quality products in the market.Don't hesitate and get in
                            touch with us.</p>
                        <div className="testimonial-container">
                            <p className="testimonial-text">Need a solid foundation for your business growth plans?Aria will help you manage
                                sales and meet your current requirements.</p>
                            <p className="testimonial-author">General Manager</p>
                        </div>
                        <a className="btn-solid-reg" href="#your-link">DETAILS</a> <a className="btn-outline-reg mfp-close as-button"
                            href="#projects">BACK</a>
                    </div>
                </div>
            </div>



            <div id="project-6" className="lightbox-basic zoom-anim-dialog mfp-hide">
                <div className="row">
                    <button title="Close (Esc)" type="button" className="mfp-close x-button">×</button>
                    <div className="col-lg-8">
                        <img className="img-fluid" src="images/project-6.jpg" alt="alternative" />
                    </div>
                    <div className="col-lg-4">
                        <h3>Spark Events</h3>
                        <hr className="line-heading" />
                        <h6>Strategy Development</h6>
                        <p>Need a solid foundation for your business growth plans?Aria will help you manage sales and meet your current
                            needs</p>
                        <p>By offering the best professional services and quality products in the market.Don't hesitate and get in
                            touch with us.</p>
                        <div className="testimonial-container">
                            <p className="testimonial-text">Need a solid foundation for your business growth plans?Aria will help you manage
                                sales and meet your current requirements.</p>
                            <p className="testimonial-author">General Manager</p>
                        </div>
                        <a className="btn-solid-reg" href="#your-link">DETAILS</a> <a className="btn-outline-reg mfp-close as-button"
                            href="#projects">BACK</a>
                    </div>
                </div>
            </div>



            <div id="project-7" className="lightbox-basic zoom-anim-dialog mfp-hide">
                <div className="row">
                    <button title="Close (Esc)" type="button" className="mfp-close x-button">×</button>
                    <div className="col-lg-8">
                        <img className="img-fluid" src="images/project-7.jpg" alt="alternative" />
                    </div>
                    <div className="col-lg-4">
                        <h3>Casual Wear</h3>
                        <hr className="line-heading" />
                        <h6>Strategy Development</h6>
                        <p>Need a solid foundation for your business growth plans?Aria will help you manage sales and meet your current
                            needs</p>
                        <p>By offering the best professional services and quality products in the market.Don't hesitate and get in
                            touch with us.</p>
                        <div className="testimonial-container">
                            <p className="testimonial-text">Need a solid foundation for your business growth plans?Aria will help you manage
                                sales and meet your current requirements.</p>
                            <p className="testimonial-author">General Manager</p>
                        </div>
                        <a className="btn-solid-reg" href="#your-link">DETAILS</a> <a className="btn-outline-reg mfp-close as-button"
                            href="#projects">BACK</a>
                    </div>
                </div>
            </div>
            <div id="project-8" className="lightbox-basic zoom-anim-dialog mfp-hide">
                <div className="row">
                    <button title="Close (Esc)" type="button" className="mfp-close x-button">×</button>
                    <div className="col-lg-8">
                        <img className="img-fluid" src="images/project-8.jpg" alt="alternative" />
                    </div>
                    <div className="col-lg-4">
                        <h3>Zazoo Apps</h3>
                        <hr className="line-heading" />
                        <h6>Strategy Development</h6>
                        <p>Need a solid foundation for your business growth plans?Aria will help you manage sales and meet your current
                            needs</p>
                        <p>By offering the best professional services and quality products in the market.Don't hesitate and get in
                            touch with us.</p>
                        <div className="testimonial-container">
                            <p className="testimonial-text">Need a solid foundation for your business growth plans?Aria will help you manage
                                sales and meet your current requirements.</p>
                            <p className="testimonial-author">General Manager</p>
                        </div>
                        <a className="btn-solid-reg" href="#your-link">DETAILS</a> <a className="btn-outline-reg mfp-close as-button"
                            href="#projects">BACK</a>
                    </div>
                </div>
            </div>

        </div>
    );

}
export default PhotoSection;