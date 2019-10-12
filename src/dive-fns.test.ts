import * as df from './dive-fns'

describe('df', () => {
  it('should calculate ata for depth', () => {
    expect(df.absolutePressureAtDepth(0)).toEqual(1)
    expect(df.absolutePressureAtDepth(10)).toEqual(2)
    expect(df.absolutePressureAtDepth(20)).toEqual(3)
    expect(df.absolutePressureAtDepth(25)).toEqual(3.5)
  })

  it('should calculate equivalent air depth for depth and fo2', () => {
    expect(df.equivalentAirDepth(27, 0.36)).toEqual(20)
    expect(df.equivalentAirDepth(30.5, 0.32)).toEqual(24.9)
  })

  it('should calculate actual depth for equivalent air depth and fo2', () => {
    expect(df.actualDepth(20, 0.36)).toEqual(27)
    expect(df.actualDepth(24.9, 0.32)).toEqual(30.5)
  })

  it('should calculate surface air consumption for used air, average depth, and time at depth', () => {
    expect(df.surfaceAirConsumption(40, 10, 10)).toEqual(2)
    expect(df.surfaceAirConsumption(140, 20, 20)).toEqual(2.33)
    expect(df.surfaceAirConsumption(140, 11.1, 47)).toEqual(1.41)
    expect(df.surfaceAirConsumption(180, 11.4, 50)).toEqual(1.68)
    expect(df.surfaceAirConsumption(130, 10.3, 53)).toEqual(1.21)
    expect(df.surfaceAirConsumption(150, 12.7, 51)).toEqual(1.3)
  })

  it('should calculate ppo2 for depth and fo2', () => {
    expect(df.partialPercentageOxygen(0, 0.21)).toEqual(0.21)
    expect(df.partialPercentageOxygen(10, 0.21)).toEqual(0.42)
    expect(df.partialPercentageOxygen(20, 0.36)).toEqual(1.08)
  })

  it('should calculate maximum operating depth (mod) for ppo2 and mix', () => {
    expect(df.maximumOperatingDepth(1.4, 0.21)).toEqual(56.7)
    expect(df.maximumOperatingDepth(1.6, 0.21)).toEqual(66.2)
    expect(df.maximumOperatingDepth(1.4, 0.32)).toEqual(33.8)
    expect(df.maximumOperatingDepth(1.6, 0.32)).toEqual(40)
    expect(df.maximumOperatingDepth(1.4, 0.36)).toEqual(28.9)
    expect(df.maximumOperatingDepth(1.6, 0.36)).toEqual(34.4)
  })

  it('should calculate no decompression limits for a certain depth and ppo2', () => {
    expect(df.noDecompressionLimit(18, 0.21)).toEqual(63)
  })

  it('should calculate central nervous system oxygen toxicity for bottom time and ppo2', () => {
    expect(df.centralNervousSystemOxygenToxicity(50, df.partialPercentageOxygen(21, 0.32))).toEqual(
      0.17
    )
  })

  it('should calculate best mix for depth and ppo2', () => {
    expect(df.bestMix(30, 1.4)).toEqual(0.35)
    expect(df.bestMix(30, 1.6)).toEqual(0.4)
  })

  it('should calculate air consumption at depth for depth and sac', () => {
    expect(df.airConsumptionAtDepth(20, 1.7)).toEqual(5.1)
  })

  it('should calculate remaining dive time for air, depth, and sac', () => {
    expect(df.remainingTimeAtDepth(150, 20, 1.7)).toEqual(29)
  })
})
