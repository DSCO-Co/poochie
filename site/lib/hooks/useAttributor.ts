import { useEffect, useState } from 'react';
import Attributor, { AttributorConfig } from '../attributor/Attributor';

export const useAttributor = (config?: AttributorConfig): Attributor => {
    // @ts-expect-error
    const [attributor, setAttributor] = useState<Attributor>(null);

    useEffect(() => {
        const newAttributor = new Attributor(config);
        setAttributor(newAttributor);

        // return () => {
        //     newAttributor.destroy();
        // };
    }, []);

    return attributor;
};


