<?php
	// Slumpar ut en fördröjning mellan 0 och 3 sekunder.
	sleep(rand(0,3));

	// Sökvög till tumnagelbilderna.
	$path_thumb = "../pics/thumbs/";
	$path_pics = "../pics/";
	
	$files = array();
	$nbrOfFiles = 0;
	
	if ($handle = opendir($path_thumb)) 
	{
		while ((false !== ($file = readdir($handle))) ) 
		{
			if(stripos($file, ".jpg") != 0)
			{
				$sizeThumb = getimagesize($path_thumb.$file);
				$sizeImg = getimagesize($path_pics.$file);				
	
				$files[$nbrOfFiles]["fileName"] = $file;
				$files[$nbrOfFiles]["thumbWidth"] = $sizeThumb[0];
				$files[$nbrOfFiles]["thumbHeight"] = $sizeThumb[1];
				$files[$nbrOfFiles]["width"] = $sizeImg[0];
				$files[$nbrOfFiles]["height"] = $sizeImg[1];
				$nbrOfFiles++;
			}
		}
		closedir($handle);
	}
	
	echo(json_encode($files));
?>
