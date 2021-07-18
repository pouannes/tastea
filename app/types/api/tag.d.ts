type type = 'time' | 'weather' | 'taste' | 'blend' | 'flavor';

export default interface tag {
  id: number;
  name: string;
  type?: type;
}
