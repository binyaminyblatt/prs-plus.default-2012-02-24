mount -t cramfs -o loop,ro /opt1/dict/prsp/resources.img /opt/sony/ebook/application/resources
# Fix for dictionary files
cp /opt1/dict/prsp/kconfig_1.0.02.13180.xml /tmp
/bin/grep -q "CDUS125D0000101Y" /opt1/dict/LIBRARY.MBF
if [ $? == 0 ]; then
   /bin/mount --bind /tmp/kconfig_1.0.02.13180.xml /opt/sony/ebook/application/kconfig.xml
fi

# Run prsp.sh shell script located on sd card,
if [ -f /Data/database/system/PRSPlus/prsp.sh ]
then
	. /Data/database/system/PRSPlus/prsp.sh
fi
