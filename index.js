const inputNumbers = /([^.0-9]0|^0)$/
const endsWithOperator = /[×+-/]$/
const endsWithNegativeSign = /\d[×/+-]{1}-$/
const isOperator = /[×/+-]/

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currVal: '0',
      prevVal: '0',
      formula: '',
      currSign: 'pos',
      lastClicked: '',
      evaluated: false
    }

    this.handleEvaluate = this.handleEvaluate.bind(this)
    this.handleOperator = this.handleOperator.bind(this)
    this.handleDecimal = this.handleDecimal.bind(this)
    this.handleNumber = this.handleNumber.bind(this)
    this.handleAllClear = this.handleAllClear.bind(this)
  }

  handleEvaluate = () => {
    let expression = this.state.formula
    while (endsWithOperator.test(expression)) {
      expression = expression.slice(0, -1)
    }
    expression = expression
      .replace(/×/g, '*')
      .replace(/-/g, '-')
      .replace('--', '+0+0+0+0+0+0+')

    let answer = Math.round(1000000000000 * eval(expression)) / 1000000000000
    this.setState({
      formula: expression
        .replace(/\*/g, '×')
        .replace(/-/g, '-')
        .replace('+0+0+0+0+0+0+', '--'),
      currVal: answer,
      prevVal: answer,
      evaluated: true
    })
  }

  handleOperator = (e) => {
    let value = e.target.value
    let { formula, prevVal, evaluated } = this.state

    this.setState({ currVal: value, evaluated: false })

    if (evaluated) {
      this.setState({
        formula: prevVal + value,
      })
    } else if (!endsWithOperator.test(formula)) {
      this.setState({
        prevVal: formula,
        formula: formula + value
      })
    } else if (!endsWithNegativeSign.test(formula)) {
      this.setState({
        formula: (
          endsWithNegativeSign.test(formula + value)
            ? formula
            : prevVal
        ) + value
      })
    } else if (value !== '-') {
      this.setState({
        formula: prevVal + value
      })
    }
  }

  handleDecimal = () => {
    let { currVal, formula, evaluated } = this.state

    if (evaluated) {
      this.setState({
        formula: '0.',
        currVal: '0.',
        evaluated: false
      })
    } else if (!currVal.includes('.')) {
      if (endsWithOperator.test(formula || (currVal === '0' && formula === ''))) {
        this.setState({
          currVal: '0.',
          formula: formula + '0.'
        })
      } else {
        this.setState({
          formula: formula + '.',
          currVal: formula.match(/(-?\d+\.?\d*)$/)[0] + '.'
        })
      }
    }
  }

  handleNumber = (e) => {
    let value = e.target.value
    let { currVal, formula, evaluated } = this.state

    if (currVal.length > 21) {
      // TODO: handle too long currVal
    } else if (evaluated) {
      this.setState({
        currVal: value,
        formula: formula !== ''
          ? value
          : formula + value,
        evaluated: false
      })
    } else {
      this.setState({
        currVal: currVal === '0' || isOperator.test(currVal)
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
      lastClicked: '',
      evaluated: false
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
              handleEvaluate={this.handleEvaluate}
              handleOperator={this.handleOperator}
              handleDecimal={this.handleDecimal}
              handleNumber={this.handleNumber}
              handleAllClear={this.handleAllClear}
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
      <div className='buttons-container'>
        <button id='add' onClick={this.props.handleOperator} value='+'>+</button>
        <button id='subtract' onClick={this.props.handleOperator} value='-'>-</button>
          <button id='multiply' onClick={this.props.handleOperator} value='×'>×</button>
          <button id='divide' onClick={this.props.handleOperator} value='/'>/</button>
        <div className='left'>
          <button id='nine' onClick={this.props.handleNumber} value='9'>9</button>
          <button id='eight' onClick={this.props.handleNumber} value='8'>8</button>
          <button id='seven' onClick={this.props.handleNumber} value='7'>7</button>
          <button id='six' onClick={this.props.handleNumber} value='6'>6</button>
          <button id='five' onClick={this.props.handleNumber} value='5'>5</button>
          <button id='four' onClick={this.props.handleNumber} value='4'>4</button>
          <button id='three' onClick={this.props.handleNumber} value='3'>3</button>
          <button id='two' onClick={this.props.handleNumber} value='2'>2</button>
          <button id='one' onClick={this.props.handleNumber} value='1'>1</button>
          <button id='zero' onClick={this.props.handleNumber} value='0'>0</button>
          <button id='decimal' onClick={this.props.handleDecimal} value='.'>.</button>
          <button id='clear' onClick={this.props.handleAllClear}>AC</button>
        </div>
        <div className='right'>
          <button id='equals' onClick={this.props.handleEvaluate} value='='>=</button>
        </div>
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
