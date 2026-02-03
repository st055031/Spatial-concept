export enum Topic {
  Tetrahedron = 'Tetrahedron',
  Pyramid = 'Pyramid',
  DihedralAngle = 'DihedralAngle',
  ThreePerpendiculars = 'ThreePerpendiculars',
  CoordinateSystem = 'CoordinateSystem',
  PlaneIntersections = 'PlaneIntersections',
  FoldingRectangle = 'FoldingRectangle',
  FoldingSquare = 'FoldingSquare'
}

export interface TopicInfo {
  id: Topic;
  title: string;
  description: string;
}