import React from 'react';
import { render, act, waitFor } from '@testing-library/react';
import axios from "axios";

import GlobalProvider from '@providers/Global';
import Layout from '@components/Layout';
import HomePage from '@pages/Home';
import mockedData from '@assets/mocks/mocked-image-of-the-day.json';

jest.mock("axios");

describe('App...', () => {
  it('should render', async () => {
    await act(async () => {
      const { getByTestId } = render(
        <GlobalProvider>
        <Layout data-testid='layout-component'>
          <HomePage />
        </Layout>
      </GlobalProvider>
      );

      expect(getByTestId('layout-component')).toBeInTheDocument();
    });
  });

  it('should fetch and show image of the day', async () => {
    axios.mockImplementation((requestConfig) => {
      var response = {
        data: {},
        status: -1,
        statusText: '',
        headers: {},
        config: {},
        request: {}
      };

      if (requestConfig.params.date) {
        return Object.assign(response, {data: mockedData, statusText: 'OK'});  
      }
      return response;
    });

    const { findByAltText } = render(
      <GlobalProvider>
        <Layout>
          <HomePage />
        </Layout>
      </GlobalProvider>
    );

    var element = await findByAltText(/image.*of.*the.*day/i, {}, { timeout: 3000 });
    expect(element).toHaveAttribute(
      'src', 'https://apod.nasa.gov/apod/image/2201/RigelWitchHead_Mtanous_2834.jpg');
  });
});