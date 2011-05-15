mount -t cramfs -o loop,ro /opt1/dict/prsp/resources.img /opt/sony/ebook/application/resources
mount --bind /opt1/dict/prsp/deviceConfig.xml /opt/sony/ebook/application/deviceConfig.xml
# Run prsp.sh shell script located in internal memory
if [ -f /Data/database/system/PRSPlus/prsp.sh ]
then
	. /Data/database/system/PRSPlus/prsp.sh
fi
