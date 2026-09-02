import React from 'react';

type State = { err?: unknown };

export default class ErrorBoundary extends React.Component<React.PropsWithChildren, State> {
  state: State = { err: undefined };

  static getDerivedStateFromError(err: unknown) {
    return { err };
  }

  render() {
    if (this.state.err) {
      return (
        <div className="error-boundary">
          <strong>Component crashed:</strong> {String(this.state.err)}
        </div>
      );
    }
    return this.props.children;
  }
}
