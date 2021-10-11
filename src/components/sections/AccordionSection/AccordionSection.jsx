import './AccordionSection.css'

function AccordionSection() {
    return (
        <div id="details" className="accordion">
            <div className="area-1">
            </div>
            <div className="area-2">
                <div className="accordion-container" id="accordionOne">
                    <h2>Accelerate Business Growth To Improve Revenue Numbers</h2>
                    <div className="item">
                        <div id="headingOne">
                            <span data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne"
                                role="button">
                                <span className="circle-numbering">1</span><span className="accordion-title">How Can Aria Help Your
                                    Business</span>
                            </span>
                        </div>
                        <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionOne">
                            <div className="accordion-body">
                                At Aria solutions, we’ve taken the consultancy concept one step further by offering a full service
                                management organization with expertise.
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <div id="headingTwo">
                            <span className="collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false"
                                aria-controls="collapseTwo" role="button">
                                <span className="circle-numbering">2</span><span className="accordion-title">Great Strategic Business
                                    Planning</span>
                            </span>
                        </div>
                        <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionOne">
                            <div className="accordion-body">
                                Aria partners with businesses to business growth and development ideas including environment analysis,
                                plan execution and evaluation.
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <div id="headingThree">
                            <span className="collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false"
                                aria-controls="collapseThree" role="button">
                                <span className="circle-numbering">3</span><span className="accordion-title">Online Marketing Campaigns</span>
                            </span>
                        </div>
                        <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordionOne">
                            <div className="accordion-body">
                                An awesome online marketing plan won't save your bad product but paired with a good product, the sky is
                                the limit for what can be achieved.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AccordionSection;