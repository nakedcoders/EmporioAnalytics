import React from 'react'
import { shallow, mount } from 'enzyme'
import renderer from 'react-test-renderer'

import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();
const store = mockStore({});

import App from '../pages/index'

describe('Index.js', () => {
  it('renders parent component', () => {
    const wrapper = shallow(
        <Provider store={store}>
            <App />
        </Provider>
    )

    expect(wrapper.find('div'))
  })

  it('renders child component', () => {
    const wrapper = shallow(
        <Provider store={store}>
            <App />
        </Provider>
    )
    expect(wrapper.find('div'))
  })

})

