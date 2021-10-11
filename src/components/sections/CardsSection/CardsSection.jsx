import './CardsSection.css'

function CardsSection() {
    return (
        <div className="cards-1">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">


                        <div className="card">
                            <span className="fa-stack">
                                <span className="hexagon"></span>
                                <i className="fas fa-binoculars fa-stack-1x"></i>
                            </span>
                            <div className="card-body">
                                <h4 className="card-title">Environment Analysis</h4>
                                <p>The starting point of any success story is knowing your current position in the business environment
                                </p>
                            </div>
                        </div>



                        <div className="card">
                            <span className="fa-stack">
                                <span className="hexagon"></span>
                                <i className="fas fa-list-alt fa-stack-1x"></i>
                            </span>
                            <div className="card-body">
                                <h4 className="card-title">Development Planning</h4>
                                <p>After completing the environmental analysis the next stage is to design and plan your development
                                    strategy</p>
                            </div>
                        </div>



                        <div className="card">
                            <span className="fa-stack">
                                <span className="hexagon"></span>
                                <i className="fas fa-chart-pie fa-stack-1x"></i>
                            </span>
                            <div className="card-body">
                                <h4 className="card-title">Execution &amp; Evaluation</h4>
                                <p>In this phase you will focus on executing the actions plan and evaluating the results after each
                                    marketing campaign</p>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardsSection;