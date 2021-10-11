import ReactPlayer from 'react-player'
import './HeaderSection.css'

function HeaderSection(){
    return (
        <header id="header" className="header">
        <div className="header-content">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="text-container">
                  <h1>Stacked Actors</h1>
                  <p className="p-heading p-large">For you and your kind...</p>
                  {/* <a className="btn-solid-lg page-scroll" href="#intro">music</a> */}
                  {/* <ReactPlayer className="react-player" url='https://www.youtube.com/watch?v=ysz5S6PUM-U' /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
}

export default HeaderSection;