class App extends React.Component {
  render() {
    return ( 
      <div id="content-wrapper" className="container-fluid">
        <div id="row-wrapper" className="row align-items-center justify-content-center">
          <div id="calculator" className="row"></div>
        </div>
      </div>
     )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))