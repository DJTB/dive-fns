import {
  SALTWATER_DEPTH_OF_ONE_BAR,
  ONE_ATM,
  SLOPE,
  INTERCEPT,
  BUHLMANN_ZHL16_B
} from './constants'

import round from './round'

// TODO: allow freshwater flag?
export function absolutePressureAtDepth(depth: Metre): ATA {
  return depth / SALTWATER_DEPTH_OF_ONE_BAR + ONE_ATM
}

export function partialPercentageOxygen(depth: Metre, fo2: FO2): PPO2 {
  return absolutePressureAtDepth(depth) * fo2
}

export function equivalentAirDepth(depth: Metre, fo2: FO2): Metre {
  const fn2Air = 0.79
  const fn2 = 1 - fo2
  const result = (fn2 * (depth + 10)) / fn2Air - 10
  return round(result, 1)
}

export function maximumOperatingDepth(ppo2: PPO2, fo2: FO2): Metre {
  const result = (ppo2 / fo2) * 10 - 10
  return round(result, 1)
}

export function noDecompressionLimit(depth: Metre, ppo2: PPO2): Minute {
  let ndl = 1000
  const pamb = depth + 10
  const pi = (pamb - 0.627) * (1 - ppo2)
  const po = (10 - 0.627) * (1 - ppo2)

  BUHLMANN_ZHL16_B.forEach(([ht, mo]) => {
    const k = Math.log(2) / ht

    if ((pi > mo && mo > po) || (pi < mo && mo < po)) {
      ndl = Math.min((-1 / k) * Math.log((pi - mo) / (pi - po)), ndl)
    }
  })

  return Math.floor(ndl)
}

export function surfaceAirConsumption(usedAir: Bar, averageDepth: Metre, timeAtDepth: Minute): BPM {
  return round(usedAir / timeAtDepth / absolutePressureAtDepth(averageDepth))
}

export function airConsumptionAtDepth(depth: Metre, sac: BPM): BPM {
  return sac * absolutePressureAtDepth(depth)
}

export function remainingTimeAtDepth(availableAir: Bar, depth: Metre, sac: BPM): Minute {
  return Math.floor(availableAir / airConsumptionAtDepth(depth, sac))
}

export function centralNervousSystemOxygenToxicity(actualBottomTime: Minute, ppo2: PPO2): CNS {
  const averagePpo2 = Math.floor(ppo2 * 10 + 0.5)
  const cns = actualBottomTime / (SLOPE[averagePpo2] * ppo2 + INTERCEPT[averagePpo2])
  return Math.ceil(cns * 100) / 100
}

export function bestMix(maxDepth: Metre, maxPpo2: PPO2): FO2 {
  return Math.floor(((maxPpo2 * 10) / (maxDepth + 10)) * 100) / 100
}
