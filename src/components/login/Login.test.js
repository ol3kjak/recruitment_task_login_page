import React from "react";
import ReactDOM from 'react-dom';
import Login from "../../components/login/Login";
import {render, fireEvent, screen } from "@testing-library/react"
import {waitFor} from "@testing-library/dom";

it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Login />, div)
})

it('submits correct values', async () => {
    const { container } = render(<Login />)
    const email = container.querySelector('input[name="email"]')
    const password = container.querySelector('input[type="password"]')
    const submit = container.querySelector('button[type="submit"]')

    waitFor( () => {
        fireEvent.change(email, {
            target: {
                value: "mock@email"
            }
        })
    })

    waitFor(  () => {
        fireEvent.change(password, {
            target: {
                value: "a"
            }
        })
    })

    waitFor(() => {
        fireEvent.click(submit)
    })

    expect("Password").toEqual(expect.not.stringContaining("Password must be minimum eight characters, at least one uppercase letter, one lowercase letter and one number"))
})

