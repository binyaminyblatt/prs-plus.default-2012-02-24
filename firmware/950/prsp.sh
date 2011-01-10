mount -t cramfs -o loop,ro /opt1/dict/prsp/resources.img /opt/sony/ebook/application/resources
# Run prsp.sh shell script located on sd card,
if [ -f /Data/database/system/PRSPlus/prsp.sh ]
then
	. /Data/database/system/PRSPlus/prsp.sh
fi
