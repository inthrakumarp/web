import React, { Component } from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import api from './Api'
import './App.css'

class App extends Component {
      state = {
        user: null,
        email: '',
        password: '',
      }

      loginUser = async (e) => {
        e.preventDefault()
        const { email, password } = this.state
        const { data: token } = await api.loginUser(email, password)
        const { data: user } = await api.getUser(token)
        this.setState({ user })
      }

      inputChange = (e) => this.setState({ [e.target.id]: e.target.value })

      renderLoginForm = () => {
        const { email, password } = this.state
        return (
          <form onSubmit={this.loginUser}>
            <h1>IB Candidate site</h1>
            <h2>Updated by the CI/CD on 04-DEC-19 V1.0</h2>
            <label htmlFor="email">
              <span>Email:</span>
              <input onChange={this.inputChange} value={email} id="email" name="email" type="email" />
            </label>
            <br />
            <label htmlFor="password">
              <span>Password:</span>
              <input onChange={this.inputChange} value={password} id="password" name="password" type="password" />
            </label>
            <br />
            <button type="submit">Login</button>
          </form>
        )
      }

      render () {
        const { user } = this.state

        const data = [{
          subject: 'English A Lit',
          lvl: 'HL',
          mark: 45,
        }, {
          subject: 'Spanish B',
          lvl: 'SL',
          mark: 55,
        }, {
          subject: 'Biology',
          lvl: 'HL',
          mark: 65,
        }, {
          subject: 'Physics',
          lvl: 'SL',
          mark: 62,
        }, {
          subject: 'History',
          lvl: 'HL',
          mark: 60,
        }, {
          subject: 'Mathematics',
          lvl: 'SL',
          mark: 80,
        }]

        const columns = [{
          Header: 'Subject',
          accessor: 'subject', // String-based value accessors!
        }, {
          Header: 'Lvl',
          accessor: 'lvl',
        }, {
          Header: 'Mark',
          accessor: 'mark',
        }]
        return (
          <div className="App">
            {user ? (
              <>
                <div>{`Welcome ${user.email}!`}</div>
                <div>{`Your name is ${user.firstname} ${user.lastname}`}</div>
                <br />
                <ReactTable
                  data={data}
                  columns={columns}
                  defaultPageSize={6}
                  showPagination={false}
                />
                <div>Result code: D</div>
              </>
            ) : this.renderLoginForm()}
          </div>
        )
      }
}

export default App
