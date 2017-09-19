import React, { Component } from 'react';
import './index.css'

import remarkable from 'remarkable'
import classnames from 'classnames'

import note from './note.png'
import table from './table.png'

import { entries } from '../../data'

const md = new remarkable()

function renderView(type) {
    const tableView = (
        <table className="table-view">
            <thead>
                <tr>
                    <th>date</th>
                    <th>market</th>
                    <th>invest</th>
                    <th>roi</th>
                    <th>% gainz</th>
                    <th>decision</th>
                    <th>learning</th>
                </tr>
            </thead>
            <tbody>
                {entries.map(({ date, market, invest, roi, gains, decision, learning }, i) => (
                    <tr key={i}>
                        <td>{date}</td>
                        <td>{market}</td>
                        <td>{invest}</td>
                        <td>{roi}</td>
                        <td>{gains}</td>
                        <td className="larger-text">{decision.substring(0, 120) + "..."}</td>
                        <td className="larger-text">{learning.substring(0, 120) + "..."}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
    switch (type) {
        case "table": return tableView;
        case "notepad": return (
            <div className="notepad-view">
                {entries.map(({ date, market, invest, roi, gains, decision, learning }, i) => (
                    <div className="entry" key={i}>
                        <h4>{date}, {market}</h4>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Invest</th>
                                    <th>ROI</th>
                                    <th>Gainz</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{invest}</td>
                                    <td>{roi}</td>
                                    <td>{gains}</td>
                                </tr>
                            </tbody>
                        </table>
                        <h5>Why I entered this trade:</h5>
                        <div dangerouslySetInnerHTML={{ __html: md.render(decision) }} className="larger-text" />
                        <h5>What I learned from this trade:</h5>
                        <div dangerouslySetInnerHTML={{ __html: md.render(learning) }} className="larger-text" />
                    </div>
                ))}
            </div>
        )
        default: return tableView;
    }
}

class Logs extends Component {
    state = {
        view: "table"
    }

    toggleView = view => this.setState({ view: view })

    render() {
        const { view } = this.state
        const buttonClasses = ["control", "small"]

        const tableButtonClasses = classnames(buttonClasses, {
            transparent: view !== "table",
            active: view === "table",
        })

        const notepadButtonClasses = classnames(buttonClasses, {
            transparent: view !== "notepad",
            active: view === "notepad",
        })

        return (
            <div className="logs-container">
                <div className="controls">
                    <button disabled={view === "table"} className={tableButtonClasses} onClick={() => this.toggleView('table')}>
                        <img className="icon extra-small" src={table} alt="excel spreadsheet" />
                    </button>
                    <button disabled={view === "notepad"} className={notepadButtonClasses} onClick={() => this.toggleView('notepad')}>
                        <img className="icon extra-small" src={note} alt="notepad" />
                    </button>
                </div>
                {renderView(this.state.view)}
            </div>
        );
    }
}

export default Logs;
