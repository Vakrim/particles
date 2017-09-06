import Connection, { connections } from './Connection';
import Particle, { particles } from './Particle';

test('connection acts like spring', () => {
  const a = new Particle(0, 0);
  const b = new Particle(15, 0);

  const connection = new Connection(a, b);
  const aSpy = jest.spyOn(a, 'applyForce');
  connection.stepLinearSpring(1);
  expect(aSpy).toHaveBeenCalledTimes(1);
  expect(aSpy.mock.calls[0][0]).toBeGreaterThan(0);
  expect(aSpy.mock.calls[0][1]).toBeCloseTo(0);
  expect(aSpy.mock.calls[0][2]).toBeCloseTo(1);
});

describe('connection acts like spiral spring', () => {
  let a, b, connection, aSpy, bSpy;
  beforeEach(() => {
    a = new Particle(0, 0);
    b = new Particle(10, 0);

    connection = new Connection(a, b);

    aSpy = jest.spyOn(a, 'applyTorque');
    bSpy = jest.spyOn(b, 'applyForce');
  });

  afterEach(() => {
    bSpy.mockReset();
  });

  test('is measures angles', () => {
    expect(connection.A2BAngle).toBeCloseTo(Math.PI/2);
    expect(connection.B2AAngle).toBeCloseTo(-Math.PI/2);
  });

  test('when b.y = 5', () => {
    b.y = 5;
    connection.stepSpiralSpring(1);

    expect(bSpy).toHaveBeenCalledTimes(1);
    expect(bSpy.mock.calls[0][0]).toBeGreaterThan(0);
    expect(bSpy.mock.calls[0][1]).toBeLessThan(0);
    expect(bSpy.mock.calls[0][2]).toBeCloseTo(1);

    expect(aSpy).toHaveBeenCalledTimes(1);
    expect(aSpy.mock.calls[0][0]).toBeLessThan(0);
    expect(aSpy.mock.calls[0][1]).toBeCloseTo(1);
  });

  test('when b.y = -5', () => {
    b.y = -5;
    connection.stepSpiralSpring(1);
    expect(bSpy).toHaveBeenCalledTimes(1);
    expect(bSpy.mock.calls[0][0]).toBeGreaterThan(0);
    expect(bSpy.mock.calls[0][1]).toBeGreaterThan(0);
    expect(bSpy.mock.calls[0][2]).toBeCloseTo(1);

    expect(aSpy).toHaveBeenCalledTimes(1);
    expect(aSpy.mock.calls[0][0]).toBeGreaterThan(0);
    expect(aSpy.mock.calls[0][1]).toBeCloseTo(1);
  });

  test('when b.x = -5 and b.y = 5', () => {
    b.x = -5;
    b.y = 5;
    connection.stepSpiralSpring(1);
    expect(bSpy).toHaveBeenCalledTimes(1);
    expect(bSpy.mock.calls[0][0]).toBeGreaterThan(0);
    expect(bSpy.mock.calls[0][1]).toBeGreaterThan(0);
    expect(bSpy.mock.calls[0][2]).toBeCloseTo(1);

    expect(aSpy).toHaveBeenCalledTimes(1);
    expect(aSpy.mock.calls[0][0]).toBeLessThan(0);
    expect(aSpy.mock.calls[0][1]).toBeCloseTo(1);
  });

  test('when b.x = -5 and b.y = -5', () => {
    b.x = -5;
    b.y = -5;
    connection.stepSpiralSpring(1);
    expect(bSpy).toHaveBeenCalledTimes(1);
    expect(bSpy.mock.calls[0][0]).toBeGreaterThan(0);
    expect(bSpy.mock.calls[0][1]).toBeLessThan(0);
    expect(bSpy.mock.calls[0][2]).toBeCloseTo(1);

    expect(aSpy).toHaveBeenCalledTimes(1);
    expect(aSpy.mock.calls[0][0]).toBeGreaterThan(0);
    expect(aSpy.mock.calls[0][1]).toBeCloseTo(1);
  });
});
