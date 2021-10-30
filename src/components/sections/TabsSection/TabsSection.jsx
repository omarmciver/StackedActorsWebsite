import './TabsSection.css'

function TabsSection() {
    return (
        <div className="tabs">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="section-title">NAMES</div>
                        <h2>What's in a name?</h2>
                    </div>
                </div>
            </div>
            <div className="area-1">
                <div className="tabs-container">
                    <ul className="nav nav-tabs" id="ariaTabs" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" id="nav-tab-1" data-toggle="tab" href="#tab-1" role="tab" aria-controls="tab-1"
                                aria-selected="true"><i className="fas fa-th"></i>Stacked Actors</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="nav-tab-2" data-toggle="tab" href="#tab-2" role="tab" aria-controls="tab-2"
                                aria-selected="false"><i className="fas fa-th"></i> Goodbye Chicago</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="nav-tab-3" data-toggle="tab" href="#tab-3" role="tab" aria-controls="tab-3"
                                aria-selected="false"><i className="fas fa-th"></i> Untamed Aggression</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="nav-tab-4" data-toggle="tab" href="#tab-4" role="tab" aria-controls="tab-4"
                                aria-selected="false"><i className="fas fa-th"></i> Cold Phoenix</a>
                        </li>
                    </ul>
                    <div className="tab-content" id="ariaTabsContent">
                        <div className="tab-pane fade show active" id="tab-1" role="tabpanel" aria-labelledby="tab-1">
                            <p>Backstory here...</p>
                        </div>
                        <div className="tab-pane fade" id="tab-2" role="tabpanel" aria-labelledby="tab-2">
                            <p>Backstory here...</p>
                        </div>
                        <div className="tab-pane fade" id="tab-3" role="tabpanel" aria-labelledby="tab-3">
                            <p>Backstory here...</p>

                        </div>
                        <div className="tab-pane fade" id="tab-4" role="tabpanel" aria-labelledby="tab-4">
                            <p>Backstory here...</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TabsSection;