@echo off
set build=b
set deploy=d
if "%1" == "%build%" (
	spm build
) else if "%1" == "%deploy%" (
	rd seajs-modules\travsky /s /q
	md sea-modules\travsky
	md seajs-modules\travsky\jcf
	md seajs-modules\travsky\jcf\1.0.0
	

	xcopy dist\*.* seajs-modules\travsky\jcf\1.0.0
) else (
	echo error command: b d
)