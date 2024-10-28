import { motion } from 'framer-motion'

interface RotatingCubeProps {
  isOpen: boolean
  onClick: () => void
}

const cubeVariants = {
  closed: { rotateX: 0, rotateY: 0 },
  open: { rotateX: 180, rotateY: 180 },
}

const RotatingCube: React.FC<RotatingCubeProps> = ({ isOpen, onClick }) => {
  return (
    <motion.div
      className="w-40 h-40 relative cursor-pointer"
      onClick={onClick}
      animate={isOpen ? 'open' : 'closed'}
      variants={cubeVariants}
      transition={{ duration: 1, ease: 'easeInOut' }}
      style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
    >
      {/* Front face */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        style={{ position: 'absolute', transform: 'translateZ(50px)' }}
      >
        <defs>
          <linearGradient id="frontGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff4d4d" />
            <stop offset="100%" stopColor="#ff9999" />
          </linearGradient>
        </defs>
        <rect width="100" height="100" fill="url(#frontGradient)" stroke="white" strokeWidth="2" />
        <text
          x="50"
          y="50"
          fontFamily="Arial, sans-serif"
          fontSize="40"
          fill="white"
          textAnchor="middle"
          dominantBaseline="central"
          stroke="black"
          strokeWidth="1"
        >
          ?
        </text>
      </svg>
      {/* Right face */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        style={{ position: 'absolute', transform: 'rotateY(90deg) translateZ(50px)' }}
      >
        <rect width="100" height="100" fill="#ff6666" stroke="white" strokeWidth="2" />
      </svg>
      {/* Left face */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        style={{ position: 'absolute', transform: 'rotateY(-90deg) translateZ(50px)' }}
      >
        <rect width="100" height="100" fill="#ff8080" stroke="white" strokeWidth="2" />
      </svg>
      {/* Top face */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        style={{ position: 'absolute', transform: 'rotateX(90deg) translateZ(50px)' }}
      >
        <rect width="100" height="100" fill="#ff9999" stroke="white" strokeWidth="2" />
      </svg>
      {/* Bottom face */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        style={{ position: 'absolute', transform: 'rotateX(-90deg) translateZ(50px)' }}
      >
        <rect width="100" height="100" fill="#ffb3b3" stroke="white" strokeWidth="2" />
      </svg>
      {/* Back face */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        style={{ position: 'absolute', transform: 'rotateY(180deg) translateZ(50px)' }}
      >
        <rect width="100" height="100" fill="#ffcccc" stroke="white" strokeWidth="2" />
      </svg>
    </motion.div>
  )
}

export default RotatingCube
