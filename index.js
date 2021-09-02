class App extends React.Component {
  render() {
    return (
      <div id='content-wrapper' className='container-fluid'>
        <div id='row-wrapper' className='row align-items-center justify-content-center'>
          <div id='calculator' className='row'>
            <Formula/>
            <Output/>
            <Buttons/>
          </div>
        </div>
      </div>
    )
  }
}

class Buttons extends React.Component {
  render() {
    return (
      <div>
        <div id='clear' className='btn btn-primary'>AC</div>
        <div id='add' className='btn btn-secondary'>+</div>
        <div id='subtract' className='btn btn-secondary'>-</div>
        <div id='multiply' className='btn btn-secondary'>*</div>
        <div id='divide' className='btn btn-secondary'>/</div>
        <div id='nine' className='btn btn-secondary'>9</div>
        <div id='eight' className='btn btn-secondary'>8</div>
        <div id='seven' className='btn btn-secondary'>7</div>
        <div id='six' className='btn btn-secondary'>6</div>
        <div id='five' className='btn btn-secondary'>5</div>
        <div id='four' className='btn btn-secondary'>4</div>
        <div id='three' className='btn btn-secondary'>3</div>
        <div id='two' className='btn btn-secondary'>2</div>
        <div id='one' className='btn btn-secondary'>1</div>
        <div id='zero' className='btn btn-secondary'>0</div>
        <div id='decimal' className='btn btn-secondary'>.</div>
        <div id='equals' className='btn btn-primary'>=</div>
      </div>
    )
  }
}

class Output extends React.Component {
  render() {
    return (
      <div className='output-screen' id='display'></div>
    )
  }
}

class Formula extends React.Component {
  render() {
    return (
      <div classname='formula-screen'></div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))