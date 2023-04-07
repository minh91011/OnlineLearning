import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './MaterialDetails.module.scss';
import * as loadService from '~/apiServices/loadServices';
import ReactPlayer from 'react-player';
const cx = classNames.bind(styles);

function MaterialDetails({ materialId }) {
    const [material, setMaterial] = useState(null);

    useEffect(() => {
        const loadMaterial = async () => {
            const result = await loadService.loadMaterialById(materialId);
            if (result) setMaterial(result);
        };
        loadMaterial();
    }, [materialId]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('video-wrapper')}>
                {material && material.content && (
                    <ReactPlayer url={material.content} width="100%" height="auto" controls />
                )}
            </div>

            <h1 style={{ marginTop: '20px' }}>{material?.title}</h1>

            <h4 style={{ marginTop: '20px' }}>{material?.description}</h4>
        </div>
    );
}

export default MaterialDetails;
