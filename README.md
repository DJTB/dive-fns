# Dive Fns

A collection of functions I wanted easy access to.
All return types are numbers.
Currently only configured for saltwater.

```ts
import { absolutePressureAtDepth, /* etc */ } from 'dive-fns';

absolutePressureAtDepth(depth: Metre): ATA

airConsumptionAtDepth(depth: Metre, sac: BPM): BPM

bestMix(maxDepth: Metre, maxPpo2: PPO2): FO2

centralNervousSystemOxygenToxicity(actualBottomTime: Minute, ppo2: PPO2): CNS

equivalentAirDepth(depth: Metre, fo2: FO2): Metre

actualDepth(equivalentAirDepth: Metre, fo2: FO2): Metre

maximumOperatingDepth(ppo2: PPO2, fo2: FO2): Metre

noDecompressionLimit(depth: Metre, ppo2: PPO2): Minute

partialPercentageOxygen(depth: Metre, fo2: FO2): PPO2

remainingTimeAtDepth(availableAir: Bar, depth: Metre, sac: BPM): Minute

surfaceAirConsumption(usedAir: Bar, averageDepth: Metre, timeAtDepth: Minute): BPM
```
