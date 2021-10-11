import './TabsSection.css'

function TabsSection() {
    return (
        <div className="tabs">
            <div className="area-1">
                <div className="tabs-container">
                    <ul className="nav nav-tabs" id="ariaTabs" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" id="nav-tab-1" data-toggle="tab" href="#tab-1" role="tab" aria-controls="tab-1"
                                aria-selected="true"><i className="fas fa-th"></i> Business</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="nav-tab-2" data-toggle="tab" href="#tab-2" role="tab" aria-controls="tab-2"
                                aria-selected="false"><i className="fas fa-th"></i> Expertise</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="nav-tab-3" data-toggle="tab" href="#tab-3" role="tab" aria-controls="tab-3"
                                aria-selected="false"><i className="fas fa-th"></i> Quality</a>
                        </li>
                    </ul>
                    <div className="tab-content" id="ariaTabsContent">
                        <div className="tab-pane fade show active" id="tab-1" role="tabpanel" aria-labelledby="tab-1">
                            <h4>Business Services For Companies</h4>
                            <p>Aria provides the most innovative and customized business services in the industry. Our <a
                                className="green page-scroll" href="#services">Services</a> section shows how flexible we are for all types
                                of budgets.</p>
                            <div className="progress-container">
                                <div className="title">Business Development 100%</div>
                                <div className="progress">
                                    <div className="progress-bar first" role="progressbar" aria-valuenow="0" aria-valuemin="0"
                                        aria-valuemax="100"></div>
                                </div>
                                <div className="title">Opportunity Spotting 76%</div>
                                <div className="progress">
                                    <div className="progress-bar second" role="progressbar" aria-valuenow="75" aria-valuemin="0"
                                        aria-valuemax="100"></div>
                                </div>
                                <div className="title">Online Marketing 90%</div>
                                <div className="progress">
                                    <div className="progress-bar third" role="progressbar" aria-valuenow="90" aria-valuemin="0"
                                        aria-valuemax="100"></div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="tab-2" role="tabpanel" aria-labelledby="tab-2">
                            <ul className="list-unstyled li-space-lg first">
                                <li className="media">
                                    <div className="media-bullet">1</div>
                                    <div className="media-body"><strong>High quality</strong> is on top of our list when it comes to the way we
                                        deliver the services</div>
                                </li>
                                <li className="media">
                                    <div className="media-bullet">2</div>
                                    <div className="media-body"><strong>Maximum impact</strong> is what we look for in our actions</div>
                                </li>
                                <li className="media">
                                    <div className="media-bullet">3</div>
                                    <div className="media-body"><strong>Quality standards</strong> are important but meant to be exceeded</div>
                                </li>
                            </ul>
                            <ul className="list-unstyled li-space-lg last">
                                <li className="media">
                                    <div className="media-bullet">4</div>
                                    <div className="media-body"><strong>We're always looking</strong> for industry leaders to help them win
                                        their market position</div>
                                </li>
                                <li className="media">
                                    <div className="media-bullet">5</div>
                                    <div className="media-body"><strong>Evaluation</strong> is a key aspect of this business and important</div>
                                </li>
                                <li className="media">
                                    <div className="media-bullet">6</div>
                                    <div className="media-body"><strong>Ethic</strong> procedures ar alwasy at the base of everything we do
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="tab-pane fade" id="tab-3" role="tabpanel" aria-labelledby="tab-3">
                            <p><strong>We strive to achieve</strong> 100% customer satisfaction for both types of customers: hiring
                                companies and job seekers. Types of customers: <a className="green" href="#your-link">with huge potential</a>
                            </p>
                            <p><strong>Our goal is to help</strong> your company achieve its full potential and establish long term
                                stability for <a className="green" href="#your-link">the stakeholders</a></p>
                            <ul className="list-unstyled li-space-lg">
                                <li className="media">
                                    <i className="fas fa-square"></i>
                                    <div className="media-body">It's easy to get a quotation, just call our office anytime</div>
                                </li>
                                <li className="media">
                                    <i className="fas fa-square"></i>
                                    <div className="media-body">We'll get back to you with an initial estimate soon</div>
                                </li>
                                <li className="media">
                                    <i className="fas fa-square"></i>
                                    <div className="media-body">Get ready to see results even after only 30 days</div>
                                </li>
                                <li className="media">
                                    <i className="fas fa-square"></i>
                                    <div className="media-body">Ask for a quote and start improving your business</div>
                                </li>
                                <li className="media">
                                    <i className="fas fa-square"></i>
                                    <div className="media-body">Just fill out the form and we'll call you right away</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="area-2"></div>
        </div>
    );
}

export default TabsSection;