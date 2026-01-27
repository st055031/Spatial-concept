
export enum Topic {
  Tetrahedron = 'Tetrahedron',
  Pyramid = 'Pyramid',
  DihedralAngle = 'DihedralAngle',
  ThreePerpendiculars = 'ThreePerpendiculars',
  CoordinateSystem = 'CoordinateSystem',
  PlaneIntersections = 'PlaneIntersections'
}

export interface TopicInfo {
  id: Topic;
  title: string;
  description: string;
}
