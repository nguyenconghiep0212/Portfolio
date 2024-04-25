export interface Planet {
  name: string;
  key: string;
  texture_map: string;
  normal_map: string;
  radius: number;
  tilt: number;
  mother_planet: string;
  moons: Planet[];
  ring: string;
  synodic_rotation_period: number;
  synodic_orbital_period: number;
  aphelion_astronomical_unit: number;
  perihelion_astronomical_unit: number;
  color: string;
  luminosity: number;
}
