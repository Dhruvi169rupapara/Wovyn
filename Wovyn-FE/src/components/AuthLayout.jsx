import { motion } from 'framer-motion';

const AuthLayout = ({ children, title, subtitle }) => {
    return (
        <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
            {/* Decorative Orbs */}
            <div className="orb orb-1" />
            <div className="orb orb-2" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="glass-card w-full max-w-md p-10 relative z-10"
            >
                <div className="text-center mb-8">
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl font-bold mb-2 text-primary"
                    >
                        {title}
                    </motion.h1>
                    <p className="text-text-dim">{subtitle}</p>
                </div>
                {children}
            </motion.div>
        </div>
    );
};

export default AuthLayout;
