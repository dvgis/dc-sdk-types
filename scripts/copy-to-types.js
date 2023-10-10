const fsePromise = import('fs-extra');
fsePromise.then((res) => {
  const fse = res.default;
  const dest = '../../@types/dvgis__dc-sdk';
  fse.emptyDir(dest);
  try {
    fse.copySync('./index.d.ts', dest + '/' + 'index.d.ts');
    fse.copySync('./Cesium.d.ts', dest + '/' + 'Cesium.d.ts');
    fse.copySync('./package.json', dest + '/' + 'package.json');
  } catch (err) {}
});
