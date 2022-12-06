<template>
  <h2>
    {{ asteroid.name }}
  </h2>
  <p><strong class="name">ID:</strong> {{ asteroid.neo_reference_id }}</p>
  <p>
    <strong class="name">Is Potentially Hazardous?</strong>
    <span class="hazard" v-if="asteroid.is_potentially_hazardous_asteroid">YES</span>
    <span class="no_hazard" v-else>No</span>
  </p>
  <p><strong class="name">Relative Velocity:</strong> {{ relativeVelocity(asteroid) }}</p>
  <p>
    <strong class="name">Absolute Magnitude:</strong> {{ asteroid.absolute_magnitude_h }}
  </p>
  <p>
    <strong class="name">Estimated Diameter:</strong> {{ estimatedDiameter(asteroid) }}
  </p>
  <p>
    <strong class="name">Close approach date:</strong>
    {{ asteroid.close_approach_data[0].close_approach_date_full.slice(12, 17) }}
  </p>
  <hr />
</template>

<script>
export default {
  props: ["asteroid"],
  setup({ asteroid }) {
    const relativeVelocity = (asteroid) =>
      `${Number(
        asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour
      ).toFixed(0)} km/h`;
    const estimatedDiameter = (asteroid) =>
      `${asteroid.estimated_diameter.meters.estimated_diameter_min.toFixed(
        2
      )} - ${asteroid.estimated_diameter.meters.estimated_diameter_max.toFixed(2)} m`;
    return {
      estimatedDiameter,
      relativeVelocity,
      asteroid,
    };
  },
};
</script>

<style scoped>
.hazard {
  color: var(--red);
  font-weight: 700;
  padding: 2px 10px;
}

.no_hazard {
  font-weight: 700;
  padding: 2px 10px;
}

.name {
  color: var(--secondary);
}
</style>
