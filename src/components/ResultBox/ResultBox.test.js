import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ResultBox from './ResultBox';

describe('Component ResultBox', () => {
  it('should render without crashing', () => {
    render(<ResultBox from='PLN' to='USD' amount={100} />);
  });
  it('should render proper info about conversion when PLN->USD', () => {
    const testCases = [
      { amount: 30, from: 'PLN', to: 'USD', convertedAmount: '$8.57' },
      { amount: 100, from: 'PLN', to: 'USD', convertedAmount: '$28.57' },
      { amount: 456, from: 'PLN', to: 'USD', convertedAmount: '$130.29' },
      { amount: 2, from: 'PLN', to: 'USD', convertedAmount: '$0.57' },
    ];

    for (const testObj of testCases) {
      //render component
      render(
        <ResultBox
          from={testObj.from}
          to={testObj.to}
          amount={testObj.amount}
        />
      );
      //find main div of component
      const output = screen.getByTestId('output');

      //check if proper info is rendered
      expect(output).toHaveTextContent(
        `PLN ${testObj.amount.toFixed(2)} = ${testObj.convertedAmount}`
      );

      //unmount component
      cleanup();
    }
  });

  it('should render proper info about conversion when USD->PLN', () => {
    const testCases = [
      { amount: 100, from: 'USD', to: 'PLN', convertedAmount: '350.00' },
      { amount: 987, from: 'USD', to: 'PLN', convertedAmount: '3,454.5' },
      { amount: 3, from: 'USD', to: 'PLN', convertedAmount: '10.5' },
      { amount: 335, from: 'USD', to: 'PLN', convertedAmount: '1,172.5' },
    ];

    for (const testObj of testCases) {
      //render component
      render(
        <ResultBox
          from={testObj.from}
          to={testObj.to}
          amount={testObj.amount}
        />
      );
      //find main div of component
      const output = screen.getByTestId('output');

      //check if proper info is rendered
      expect(output).toHaveTextContent(
        `$${testObj.amount.toFixed(2)} = PLN ${testObj.convertedAmount}`
      );

      //unmount component
      cleanup();
    }
  });
  it('should render proper info when try to convert PLN=>PLN or USD->USD', () => {
    const testCases = [
      { amount: 100, from: 'PLN', to: 'PLN', convertedAmount: '100.00' },
      { amount: 368, from: 'PLN', to: 'PLN', convertedAmount: '368.00' },
      { amount: 5, from: 'USD', to: 'USD', convertedAmount: '5.00' },
      { amount: 25, from: 'USD', to: 'USD', convertedAmount: '25.00' },
    ];

    for (const testObj of testCases) {
      //render component
      render(
        <ResultBox
          from={testObj.from}
          to={testObj.to}
          amount={testObj.amount}
        />
      );
      //find main div of component
      const output = screen.getByTestId('output');

      //check if proper info is rendered
      let currency = null;
      if (testObj.from === 'PLN') {
        currency = 'PLN ';
      }
      if (testObj.from === 'USD') {
        currency = '$';
      }

      expect(output).toHaveTextContent(
        `${currency}${testObj.amount.toFixed(2)} = ${currency}${
          testObj.convertedAmount
        }`
      );

      //unmount component
      cleanup();
    }
  });
  it('should return: Wrong value... when input is negative value', () => {
    const testCases = [
      { amount: -100, from: 'PLN', to: 'PLN' },
      { amount: -10, from: 'PLN', to: 'USD' },
      { amount: -268, from: 'USD', to: 'USD' },
      { amount: -25, from: 'USD', to: 'PLN' },
    ];

    for (const testObj of testCases) {
      //render component
      render(
        <ResultBox
          from={testObj.from}
          to={testObj.to}
          amount={testObj.amount}
        />
      );
      //find main div of component
      const output = screen.getByTestId('output');

      //check if proper Error text is rendered
      expect(output).toHaveTextContent('Wrong value...');

      //unmount component
      cleanup();
    }
  });
});
