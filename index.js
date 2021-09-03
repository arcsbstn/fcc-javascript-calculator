const inputNumbers = /([^.0-9]0|^0)$/
const endsWithOperator = /[*+\‑/]$/
const endsWithNegativeSign = /\d[x/+‑]{1}‑$/

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currVal: '0',
      prevVal: '0',
      formula: '',
      currSign: 'pos',
      lastClicked: ''
    }
    this.handleNumber = this.handleNumber.bind(this)
  }

  handleEvaluate = () => {
    let expression = this.state.formula
    while (endsWithOperator.test(expression)) {
      expression = expression.slice(0, -1)
    }
    expression = expression
      .replace(/x/g, '*')
      .replace(/‑/g, '-')
      .replace('--', '+0+0+0+0+0+0+')
    let answer = Math.round(1000000000000 * eval(expression)) / 1000000000000;
    this.setState({
      currVal: answer
    })
  }

  handleOperator = (e) => {
    let value = e.target.value
    let { currVal, formula, evaluated } = this.state

    this.setState({
      prevVal: formula,
      formula: endsWithOperator.test(formula)
        ? formula.slice(0, -1) + value
        : formula + value
    })

    // TODO: fix handling with minus sign (-), e.g. 8 * -5 should work
  }

  handleNumber = (e) => {
    let value = e.target.value
    let { currVal, formula, evaluated } = this.state

    if (currVal.length > 21) {
      // TODO: handle too long currVal
    } else {
      this.setState({
        currVal: currVal === '0'
          ? value
          : currVal + value,
        formula: currVal === '0' && value === '0'
          ? formula === ''
            ? value
            : formula
          : inputNumbers.test(formula)
            ? formula.slice(0, -1) + value
            : formula + value
      })
    }
  }

  handleAllClear = () => {
    this.setState({
      currVal: '0',
      prevVal: '0',
      formula: '',
      currSign: 'pos',
      lastClicked: ''
    })
  }

  render() {
    return (
      <div id='content-wrapper' className='container-fluid'>
        <div id='row-wrapper' className='row align-items-center justify-content-center'>
          <div id='calculator' className='row'>
            <Formula
              formula={this.state.formula} />
            <Output
              currVal={this.state.currVal}
            />
            <Buttons
              handleAllClear={this.handleAllClear}
              handleNumber={this.handleNumber}
              handleOperator={this.handleOperator}
              handleEvaluate={this.handleEvaluate}
            />
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
        <button id='clear' className='btn btn-primary' onClick={this.props.handleAllClear}>AC</button>
        <button id='add' className='btn btn-secondary' onClick={this.props.handleOperator} value='+'>+</button>
        <button id='subtract' className='btn btn-secondary' onClick={this.props.handleOperator} value='-'>-</button>
        <button id='multiply' className='btn btn-secondary' onClick={this.props.handleOperator} value='*'>*</button>
        <button id='divide' className='btn btn-secondary' onClick={this.props.handleOperator} value='/'>/</button>
        <button id='nine' className='btn btn-secondary' onClick={this.props.handleNumber} value='9'>9</button>
        <button id='eight' className='btn btn-secondary' onClick={this.props.handleNumber} value='8'>8</button>
        <button id='seven' className='btn btn-secondary' onClick={this.props.handleNumber} value='7'>7</button>
        <button id='six' className='btn btn-secondary' onClick={this.props.handleNumber} value='6'>6</button>
        <button id='five' className='btn btn-secondary' onClick={this.props.handleNumber} value='5'>5</button>
        <button id='four' className='btn btn-secondary' onClick={this.props.handleNumber} value='4'>4</button>
        <button id='three' className='btn btn-secondary' onClick={this.props.handleNumber} value='3'>3</button>
        <button id='two' className='btn btn-secondary' onClick={this.props.handleNumber} value='2'>2</button>
        <button id='one' className='btn btn-secondary' onClick={this.props.handleNumber} value='1'>1</button>
        <button id='zero' className='btn btn-secondary' onClick={this.props.handleNumber} value='0'>0</button>
        <button id='decimal' className='btn btn-secondary'>.</button>
        <button id='equals' className='btn btn-primary' onClick={this.props.handleEvaluate} value='='>=</button>
      </div>
    )
  }
}

class Output extends React.Component {
  render() {
    return (
      <div id='display' className='output-screen'>{this.props.currVal}</div>
    )
  }
}

class Formula extends React.Component {
  render() {
    return (
      <div className='formula-screen'>{this.props.formula}</div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))