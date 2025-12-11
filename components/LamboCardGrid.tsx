'use client';

import { motion } from 'framer-motion';
import LamboCard from './LamboCard';
import { VehicleData } from '@/lib/constants';

interface LamboCardGridProps {
  vehicles: VehicleData[];
  onVehicleSelect: (vehicle: VehicleData) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

export default function LamboCardGrid({ vehicles, onVehicleSelect }: LamboCardGridProps) {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6 max-w-7xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ perspective: 1200 }}
    >
      {vehicles.map((vehicle, index) => (
        <LamboCard
          key={vehicle.id}
          vehicle={vehicle}
          onClick={onVehicleSelect}
          index={index}
        />
      ))}
    </motion.div>
  );
}
